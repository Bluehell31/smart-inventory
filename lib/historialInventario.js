"use server";
import { pool } from "@/bd"; // Asegúrate de que este es el camino correcto para importar tu conexión de base de datos

// Obtener todo el historial de inventario con detalles relacionados
export const obtenerHistorialInventario = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query(`
      SELECT hist.IDHistorial, hist.FechaCambio, hist.Cantidad, hist.TipoCambio,
             prod.Nombre AS NombreProducto,
             bodega.NombreBodega,
             usr.NombreUsuario
      FROM HistorialInventario AS hist
      INNER JOIN Productos AS prod ON hist.IDProducto = prod.IDProducto
      INNER JOIN Bodegas AS bodega ON hist.IDBodega = bodega.IDBodega
      INNER JOIN Usuarios AS usr ON hist.IDUsuario = usr.IDUsuario
      ORDER BY hist.FechaCambio DESC
    `);
    return rows;
  } catch (error) {
    console.error('Error al obtener historial de inventario:', error);
  } finally {
    connection.release();
  }
};

// Crear un nuevo registro en el historial de inventario
export const crearHistorialInventario = async ({ idProducto, idBodega, cantidad, tipoCambio, idUsuario }) => {
  const connection = await pool.connect();
  try {
    const result = await connection.query(`
      INSERT INTO HistorialInventario (IDProducto, IDBodega, Cantidad, TipoCambio, IDUsuario, FechaCambio)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `, [idProducto, idBodega, cantidad, tipoCambio, idUsuario]);
    return result.rows[0]; // Retorna el registro creado
  } catch (error) {
    console.error('Error al crear historial de inventario:', error);
  } finally {
    connection.release();
  }
};

// Obtener un registro específico de historial de inventario
export const obtenerRegistroHistorialInventario = async (idHistorial) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(`
      SELECT hist.IDHistorial, hist.FechaCambio, hist.Cantidad, hist.TipoCambio,
             prod.Nombre AS NombreProducto,
             bodega.NombreBodega,
             usr.NombreUsuario
      FROM HistorialInventario AS hist
      INNER JOIN Productos AS prod ON hist.IDProducto = prod.IDProducto
      INNER JOIN Bodegas AS bodega ON hist.IDBodega = bodega.IDBodega
      INNER JOIN Usuarios AS usr ON hist.IDUsuario = usr.IDUsuario
      WHERE hist.IDHistorial = $1
    `, [idHistorial]);
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error('Error al obtener registro de historial de inventario:', error);
  } finally {
    connection.release();
  }
};

// Modificar un registro de historial de inventario
export const modificarHistorialInventario = async ({ idHistorial, idProducto, idBodega, cantidad, tipoCambio, idUsuario }) => {
  const connection = await pool.connect();
  try {
    const result = await connection.query(`
      UPDATE HistorialInventario
      SET IDProducto = $2, IDBodega = $3, Cantidad = $4, TipoCambio = $5, IDUsuario = $6
      WHERE IDHistorial = $1
      RETURNING *
    `, [idHistorial, idProducto, idBodega, cantidad, tipoCambio, idUsuario]);
    return result.rows[0]; // Retorna el registro actualizado
  } catch (error) {
    console.error('Error al modificar historial de inventario:', error);
  } finally {
    connection.release();
  }
};

// Eliminar un registro de historial de inventario
export const eliminarHistorialInventario = async (idHistorial) => {
  const connection = await pool.connect();
  try {
    await connection.query(`
      DELETE FROM HistorialInventario WHERE IDHistorial = $1
    `, [idHistorial]);
  } catch (error) {
    console.error('Error al eliminar registro de historial de inventario:', error);
  } finally {
    connection.release();
  }
};
