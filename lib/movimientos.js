"use server";
import { pool } from "@/bd"; // Asegúrate de que este es el camino correcto para importar tu conexión de base de datos

// Obtener todos los movimientos con detalles relacionados
export const obtenerMovimientos = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query(`
      SELECT mov.IDMovimiento, mov.TipoMovimiento, mov.FechaMovimiento, mov.Cantidad,
             prod.Nombre AS NombreProducto, bodega.NombreBodega, usr.NombreUsuario
      FROM Movimientos AS mov
      INNER JOIN Productos AS prod ON mov.IDProducto = prod.IDProducto
      INNER JOIN Bodegas AS bodega ON mov.IDBodega = bodega.IDBodega
      INNER JOIN Usuarios AS usr ON mov.IDUsuario = usr.IDUsuario
      ORDER BY mov.IDMovimiento ASC
    `);
    return rows;
  } catch (error) {
    console.error('Error al obtener movimientos:', error);
  } finally {
    connection.release();
  }
};

// Crear un nuevo movimiento
export const crearMovimiento = async ({ tipoMovimiento, idProducto, idBodega, cantidad, idUsuario }) => {
  const connection = await pool.connect();
  try {
    const result = await connection.query(`
      INSERT INTO Movimientos (TipoMovimiento, IDProducto, IDBodega, Cantidad, IDUsuario)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [tipoMovimiento, idProducto, idBodega, cantidad, idUsuario]);
    return result.rows[0]; // Retorna el movimiento creado
  } catch (error) {
    console.error('Error al crear movimiento:', error);
  } finally {
    connection.release();
  }
};

// Obtener un movimiento específico
export const obtenerMovimiento = async (idMovimiento) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(`
      SELECT mov.IDMovimiento, mov.TipoMovimiento, mov.FechaMovimiento, mov.Cantidad,
             prod.Nombre AS NombreProducto, bodega.NombreBodega, usr.NombreUsuario
      FROM Movimientos AS mov
      INNER JOIN Productos AS prod ON mov.IDProducto = prod.IDProducto
      INNER JOIN Bodegas AS bodega ON mov.IDBodega = bodega.IDBodega
      INNER JOIN Usuarios AS usr ON mov.IDUsuario = usr.IDUsuario
      WHERE mov.IDMovimiento = $1
    `, [idMovimiento]);
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error('Error al obtener movimiento:', error);
  } finally {
    connection.release();
  }
};

// Modificar un movimiento existente
export const modificarMovimiento = async ({ idMovimiento, tipoMovimiento, idProducto, idBodega, cantidad, idUsuario }) => {
  const connection = await pool.connect();
  try {
    const result = await connection.query(`
      UPDATE Movimientos
      SET TipoMovimiento = $2, IDProducto = $3, IDBodega = $4, Cantidad = $5, IDUsuario = $6
      WHERE IDMovimiento = $1
      RETURNING *
    `, [idMovimiento, tipoMovimiento, idProducto, idBodega, cantidad, idUsuario]);
    return result.rows[0]; // Retorna el movimiento actualizado
  } catch (error) {
    console.error('Error al modificar movimiento:', error);
  } finally {
    connection.release();
  }
};

// Eliminar un movimiento
export const eliminarMovimiento = async (idMovimiento) => {
  const connection = await pool.connect();
  try {
    await connection.query(`
      DELETE FROM Movimientos WHERE IDMovimiento = $1
    `, [idMovimiento]);
  } catch (error) {
    console.error('Error al eliminar movimiento:', error);
  } finally {
    connection.release();
  }
};
