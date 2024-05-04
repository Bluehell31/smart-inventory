"use server";
import { pool } from "@/bd"; // Asegúrate de que este es el camino correcto para importar tu conexión de base de datos

export const obtenerBodegas = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query("SELECT * FROM bodegas ORDER BY idbodega ASC");
    return rows;
  } catch (error) {
    console.error('Error al obtener bodegas:', error);
    return []; // Devuelve un array vacío en caso de error
  } finally {
    connection.release();
  }
};

export const crearBodega = async ({ nombrebodega, ubicacion }) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "INSERT INTO bodegas (nombrebodega, ubicacion) VALUES ($1, $2)",
      [nombrebodega, ubicacion]
    );
  } catch (error) {
    console.error('Error al crear bodega:', error);
  } finally {
    connection.release();
  }
};

export const obtenerBodega = async (idbodega) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(
      "SELECT * FROM bodegas WHERE idbodega = $1",
      [idbodega]
    );
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error('Error al obtener bodega:', error);
  } finally {
    connection.release();
  }
};

export const modificarBodega = async ({ idbodega, nombrebodega, ubicacion }) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "UPDATE bodegas SET nombrebodega=$2, ubicacion=$3 WHERE idbodega=$1",
      [idbodega, nombrebodega, ubicacion]
    );
  } catch (error) {
    console.error('Error al actualizar bodega:', error);
  } finally {
    connection.release();
  }
};

export const eliminarBodega = async (idbodega) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "DELETE FROM bodegas WHERE idbodega = $1::INTEGER",
      [idbodega]
    );
  } catch (error) {
    console.error('Error al eliminar bodega:', error);
  } finally {
    connection.release();
  }
};
