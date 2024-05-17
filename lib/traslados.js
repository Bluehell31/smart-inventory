"use server";
import { pool } from "@/bd";  // Asegúrate de que la ruta a la base de datos es correcta
import { crearMovimientoTraslado } from "./movimientos";  // Importar la función desde movimientos


// Obtener un movimiento específico
export const obtenerMovimiento = async (idtraslado) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(
      "SELECT * FROM movimientos WHERE idmovimiento = $1",
      [idtraslado]
    );
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const obtenerTraslados = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query(`
      SELECT t.idtraslado, t.fecha_traslado, p.nombre AS nombre_producto,
             bo.nombrebodega AS bodega_origen, bd.nombrebodega AS bodega_destino,
             t.cantidad, u.nombreusuario AS usuario
      FROM traslados AS t
      JOIN productos AS p ON t.idproducto = p.idproducto
      JOIN bodegas AS bo ON t.bodegaorigenid = bo.idbodega
      JOIN bodegas AS bd ON t.bodegadestinoid = bd.idbodega
      JOIN usuarios AS u ON t.idusuario = u.idusuario
      ORDER BY t.fecha_traslado DESC
    `);
    return rows;
  } catch (error) {
    console.error('Error al obtener traslados:', error);
    return [];
  } finally {
    connection.release();
  }
};
// Función para modificar un traslado existente
export const modificarTraslado = async ({ idtraslado, idproducto, bodegaOrigen, bodegaDestino, cantidad, idusuario }) => {
  if (!idtraslado || !idproducto || !bodegaOrigen || !bodegaDestino || cantidad <= 0 || !idusuario) {
    console.error('Todos los campos son obligatorios y la cantidad debe ser positiva');
    return null;
  }

  // Llamar a la función modificarMovimientoTraslado para manejar la lógica del traslado
  return await modificarMovimientoTraslado({ idtraslado, idproducto, bodegaOrigen, bodegaDestino, cantidad, idusuario });
};

// Asegúrate de manejar correctamente la lógica de actualización del inventario en modificarMovimientoTraslado
// Función para crear un traslado
export const crearTraslado = async ({ idproducto, bodegaOrigen, bodegaDestino, cantidad, idusuario }) => {
  // Puedes agregar validaciones adicionales aquí si es necesario
  if (!idproducto || !bodegaOrigen || !bodegaDestino || cantidad <= 0 || !idusuario) {
    console.error('Todos los campos son obligatorios y la cantidad debe ser positiva');
    return null;
  }

  // Llamar a la función crearMovimientoTraslado para manejar la lógica del traslado
  return await crearMovimientoTraslado({ idproducto, bodegaOrigen, bodegaDestino, cantidad, idusuario });
};

// Función para obtener todos los traslados (si es necesario)