"use server";
import { pool } from "@/bd";  // Asegúrate de que la ruta a la conexión de la base de datos es correcta

// Obtener un movimiento específico
export const obtenerMovimiento = async (idmovimiento) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(
      "SELECT * FROM movimientos WHERE idmovimiento = $1",
      [idmovimiento]
    );
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};
// Obtener todos los movimientos con detalles relacionados
export const obtenerMovimientos = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query(`
      SELECT *
      FROM movimientos AS mov
      INNER JOIN productos AS prod ON mov.idproducto = prod.idproducto
      INNER JOIN bodegas AS bodega ON mov.idbodega = bodega.idbodega
      INNER JOIN usuarios AS usr ON mov.idusuario = usr.idusuario
      ORDER BY mov.fechamovimiento DESC
    `);
    return rows;
  } catch (error) {
    console.error('Error al obtener movimientos:', error);
    return [];
  } finally {
    connection.release();
  }
};

export const crearMovimiento = async ({ idproducto, idbodega, cantidad, idusuario }) => {
  if (!idproducto || !idbodega || !cantidad || !idusuario) {
    console.error('Error: Missing required fields');
    return null; // Termina la ejecución si falta algún campo obligatorio
  }

  const connection = await pool.connect();
  try {
    await connection.query('BEGIN');

    // Insertar el movimiento en la tabla de movimientos
    const resultMovimiento = await connection.query(`
      INSERT INTO movimientos (idproducto, idbodega, cantidad, idusuario)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [idproducto, idbodega, cantidad, idusuario]);

    // Actualizar el inventario
    await connection.query(`
      INSERT INTO inventario (idproducto, idbodega, cantidad)
      VALUES ($1, $2, $3)
      ON CONFLICT (idproducto, idbodega) DO UPDATE
      SET cantidad = inventario.cantidad + EXCLUDED.cantidad;
    `, [idproducto, idbodega, cantidad]);

    await connection.query('COMMIT');
    return resultMovimiento.rows[0];
  } catch (error) {
    await connection.query('ROLLBACK');
    console.error('Error al crear movimiento:', error);
    return null;
  } finally {
    connection.release();
  }
};

// Modificar un movimiento existente y ajustar el inventario
export const modificarMovimiento = async ({ idmovimiento, idproducto, idbodega, cantidad, idusuario }) => {
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN');

    // Obtener el movimiento existente
    const { rows: existingRows } = await connection.query(`
      SELECT idproducto, idbodega, cantidad
      FROM movimientos
      WHERE idmovimiento = $1
    `, [idmovimiento]);

    if (existingRows.length === 0) {
      throw new Error('Movimiento no encontrado.');
    }
    const movimientoActual = existingRows[0];

    // Actualizar el movimiento
    await connection.query(`
      UPDATE movimientos
      SET idproducto = $2, idbodega = $3, cantidad = $4, idusuario = $5
      WHERE idmovimiento = $1
    `, [idmovimiento, idproducto, idbodega, cantidad, idusuario]);

    // Ajustar la cantidad antigua en el inventario
    if (movimientoActual.idproducto === idproducto && movimientoActual.idbodega === idbodega) {
      const adjustment = cantidad - movimientoActual.cantidad;
      await connection.query(`
        UPDATE inventario
        SET cantidad = cantidad + $1
        WHERE idproducto = $2 AND idbodega = $3
      `, [adjustment, idproducto, idbodega]);
    } else {
      // Revertir la cantidad en la ubicación original
      await connection.query(`
        UPDATE inventario
        SET cantidad = cantidad - $1
        WHERE idproducto = $2 AND idbodega = $3
      `, [movimientoActual.cantidad, movimientoActual.idproducto, movimientoActual.idbodega]);

      // Aplicar la nueva cantidad a la nueva ubicación
      await connection.query(`
        INSERT INTO inventario (idproducto, idbodega, cantidad)
        VALUES ($1, $2, $3)
        ON CONFLICT (idproducto, idbodega) DO UPDATE
        SET cantidad = inventario.cantidad + $3
      `, [idproducto, idbodega, cantidad]);
    }

    await connection.query('COMMIT');
    return true;
  } catch (error) {
    await connection.query('ROLLBACK');
    console.error('Error al modificar movimiento:', error);
    return false;
  } finally {
    connection.release();
  }
};
// Eliminar un movimiento y ajustar el inventario
export const eliminarMovimiento = async (idmovimiento) => {
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN');  // Iniciar transacción

    // Obtener detalles del movimiento a eliminar
    const { rows } = await connection.query(`
      SELECT idproducto, idbodega, cantidad
      FROM movimientos
      WHERE idmovimiento = $1
    `, [idmovimiento]);

    if (rows.length === 0) {
      throw new Error('Movimiento no encontrado.');
    }
    const movimiento = rows[0];

    // Ajustar el inventario (suma o resta dependiendo del tipo de movimiento)
    const newQuantity = movimiento.cantidad > 0 ? -movimiento.cantidad : Math.abs(movimiento.cantidad);
    await connection.query(`
      UPDATE inventario
      SET cantidad = cantidad + $1
      WHERE idproducto = $2 AND idbodega = $3
    `, [newQuantity, movimiento.idproducto, movimiento.idbodega]);

    // Eliminar el movimiento
    await connection.query(`
      DELETE FROM movimientos WHERE idmovimiento = $1
    `, [idmovimiento]);

    await connection.query('COMMIT');  // Confirmar transacción
  } catch (error) {
    await connection.query('ROLLBACK');  // Revertir transacción en caso de error
    console.error('Error al eliminar movimiento:', error);
    throw error;  // Es importante lanzar el error para que el llamador pueda manejarlo
  } finally {
    connection.release();
  }
};
export const crearMovimientoTraslado = async ({ idproducto, bodegaOrigen, bodegaDestino, cantidad, idusuario }) => {
  if (!idproducto || !bodegaOrigen || !bodegaDestino || !cantidad || !idusuario) {
    console.error('Error: Missing required fields');
    return null; // Termina la ejecución si falta algún campo obligatorio
  }

  const connection = await pool.connect();
  try {
    await connection.query('BEGIN');

    // Crear movimiento de salida en la bodega de origen
    const resultMovimientoSalida = await connection.query(`
      INSERT INTO movimientos (idproducto, idbodega, cantidad, idusuario, tipomovimiento)
      VALUES ($1, $2, $3 * -1, $4, 'salida')
      RETURNING *;
    `, [idproducto, bodegaOrigen, cantidad, idusuario]);

    // Reducir la cantidad en el inventario de la bodega de origen
    await connection.query(`
      UPDATE inventario
      SET cantidad = cantidad - $1
      WHERE idproducto = $2 AND idbodega = $3;
    `, [cantidad, idproducto, bodegaOrigen]);

    // Crear movimiento de entrada en la bodega de destino
    const resultMovimientoEntrada = await connection.query(`
      INSERT INTO movimientos (idproducto, idbodega, cantidad, idusuario, tipomovimiento)
      VALUES ($1, $2, $3, $4, 'entrada')
      RETURNING *;
    `, [idproducto, bodegaDestino, cantidad, idusuario]);

    // Aumentar la cantidad en el inventario de la bodega de destino
    await connection.query(`
      UPDATE inventario
      SET cantidad = cantidad + $1
      WHERE idproducto = $2 AND idbodega = $3;
    `, [cantidad, idproducto, bodegaDestino]);

    await connection.query('COMMIT');
    return { salida: resultMovimientoSalida.rows[0], entrada: resultMovimientoEntrada.rows[0] };
  } catch (error) {
    await connection.query('ROLLBACK');
    console.error('Error al crear traslado:', error);
    return null;
  } finally {
    connection.release();
  }
};
// Función para modificar un traslado existente ajustando los movimientos e inventario
export const modificarMovimientoTraslado = async ({ idtraslado, idproducto, bodegaOrigen, bodegaDestino, cantidad, idusuario }) => {
  if (!idproducto || !bodegaOrigen || !bodegaDestino || cantidad <= 0 || !idusuario) {
    console.error('Error: Falta información requerida o la cantidad no es válida');
    return null;
  }

  const connection = await pool.connect();
  try {
    await connection.query('BEGIN');

    // Obtener el traslado existente para comparar y ajustar
    const trasladoActual = await connection.query(`
      SELECT * FROM traslados WHERE idtraslado = $1
    `, [idtraslado]);

    if (trasladoActual.rows.length === 0) {
      throw new Error('Traslado no encontrado.');
    }
    const { idproducto: oldIdProducto, bodegaorigenid: oldBodegaOrigen, bodegadestinoid: oldBodegaDestino, cantidad: oldCantidad } = trasladoActual.rows[0];

    // Revertir los movimientos e inventarios basados en los detalles anteriores
    // Revertir el movimiento de salida en la bodega origen
    await connection.query(`
      UPDATE inventario
      SET cantidad = cantidad + $1
      WHERE idproducto = $2 AND idbodega = $3
    `, [oldCantidad, oldIdProducto, oldBodegaOrigen]);

    // Revertir el movimiento de entrada en la bodega destino
    await connection.query(`
      UPDATE inventario
      SET cantidad = cantidad - $1
      WHERE idproducto = $2 AND idbodega = $3
    `, [oldCantidad, oldIdProducto, oldBodegaDestino]);

    // Actualizar los detalles del traslado
    await connection.query(`
      UPDATE traslados
      SET idproducto = $2, bodegaorigenid = $3, bodegadestinoid = $4, cantidad = $5, idusuario = $6
      WHERE idtraslado = $1
    `, [idtraslado, idproducto, bodegaOrigen, bodegaDestino, cantidad, idusuario]);

    // Insertar los nuevos movimientos e inventario ajustado
    // Nuevo movimiento de salida en la bodega origen
    await connection.query(`
      INSERT INTO inventario (idproducto, idbodega, cantidad)
      VALUES ($1, $2, -$3)
      ON CONFLICT (idproducto, idbodega) DO UPDATE
      SET cantidad = inventario.cantidad - EXCLUDED.cantidad
    `, [idproducto, bodegaOrigen, cantidad]);

    // Nuevo movimiento de entrada en la bodega destino
    await connection.query(`
      INSERT INTO inventario (idproducto, idbodega, cantidad)
      VALUES ($1, $2, $3)
      ON CONFLICT (idproducto, idbodega) DO UPDATE
      SET cantidad = inventario.cantidad + EXCLUDED.cantidad
    `, [idproducto, bodegaDestino, cantidad]);

    await connection.query('COMMIT');
    return true;
  } catch (error) {
    await connection.query('ROLLBACK');
    console.error('Error al modificar el traslado:', error);
    return false;
  } finally {
    connection.release();
  }
};
