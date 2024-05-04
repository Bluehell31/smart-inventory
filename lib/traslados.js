"use server";
import { pool } from "@/bd"; // Asegúrate de que este es el camino correcto para importar tu conexión de base de datos

// Obtener todos los traslados con detalles relacionados
export const obtenerTraslados = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query(`
      SELECT tras.IDTraslado, tras.FechaTraslado, tras.Cantidad,
             prod.Nombre AS NombreProducto,
             bodegaOrigen.NombreBodega AS BodegaOrigen,
             bodegaDestino.NombreBodega AS BodegaDestino,
             usr.NombreUsuario
      FROM Traslados AS tras
      INNER JOIN Productos AS prod ON tras.IDProducto = prod.IDProducto
      INNER JOIN Bodegas AS bodegaOrigen ON tras.BodegaOrigenID = bodegaOrigen.IDBodega
      INNER JOIN Bodegas AS bodegaDestino ON tras.BodegaDestinoID = bodegaDestino.IDBodega
      INNER JOIN Usuarios AS usr ON tras.IDUsuario = usr.IDUsuario
      ORDER BY tras.IDTraslado ASC
    `);
    return rows;
  } catch (error) {
    console.error('Error al obtener traslados:', error);
  } finally {
    connection.release();
  }
};

// Crear un nuevo traslado
export const crearTraslado = async ({ idProducto, bodegaOrigenID, bodegaDestinoID, cantidad, idUsuario }) => {
  const connection = await pool.connect();
  try {
    const result = await connection.query(`
      INSERT INTO Traslados (IDProducto, BodegaOrigenID, BodegaDestinoID, Cantidad, IDUsuario, FechaTraslado)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `, [idProducto, bodegaOrigenID, bodegaDestinoID, cantidad, idUsuario]);
    return result.rows[0]; // Retorna el traslado creado
  } catch (error) {
    console.error('Error al crear traslado:', error);
  } finally {
    connection.release();
  }
};

// Obtener un traslado específico
export const obtenerTraslado = async (idTraslado) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(`
      SELECT tras.IDTraslado, tras.FechaTraslado, tras.Cantidad,
             prod.Nombre AS NombreProducto,
             bodegaOrigen.NombreBodega AS BodegaOrigen,
             bodegaDestino.NombreBodega AS BodegaDestino,
             usr.NombreUsuario
      FROM Traslados AS tras
      INNER JOIN Productos AS prod ON tras.IDProducto = prod.IDProducto
      INNER JOIN Bodegas AS bodegaOrigen ON tras.BodegaOrigenID = bodegaOrigen.IDBodega
      INNER JOIN Bodegas AS bodegaDestino ON tras.BodegaDestinoID = bodegaDestino.IDBodega
      INNER JOIN Usuarios AS usr ON tras.IDUsuario = usr.IDUsuario
      WHERE tras.IDTraslado = $1
    `, [idTraslado]);
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error('Error al obtener traslado:', error);
  } finally {
    connection.release();
  }
};

// Modificar un traslado existente
export const modificarTraslado = async ({ idTraslado, idProducto, bodegaOrigenID, bodegaDestinoID, cantidad, idUsuario }) => {
  const connection = await pool.connect();
  try {
    const result = await connection.query(`
      UPDATE Traslados
      SET IDProducto = $2, BodegaOrigenID = $3, BodegaDestinoID = $4, Cantidad = $5, IDUsuario = $6
      WHERE IDTraslado = $1
      RETURNING *
    `, [idTraslado, idProducto, bodegaOrigenID, bodegaDestinoID, cantidad, idUsuario]);
    return result.rows[0]; // Retorna el traslado actualizado
  } catch (error) {
    console.error('Error al modificar traslado:', error);
  } finally {
    connection.release();
  }
};

// Eliminar un traslado
export const eliminarTraslado = async (idTraslado) => {
  const connection = await pool.connect();
  try {
    await connection.query(`
      DELETE FROM Traslados WHERE IDTraslado = $1
    `, [idTraslado]);
  } catch (error) {
    console.error('Error al eliminar traslado:', error);
  } finally {
    connection.release();
  }
};
