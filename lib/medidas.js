"use server";
import { pool } from "@/bd"; // Asegúrate de que este es el camino correcto para importar tu conexión de base de datos

// Obtener todas las medidas
export const obtenerMedidas = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query("SELECT * FROM medidas ORDER BY idmedida ASC");
    return rows;
  } catch (error) {
    console.error('Error al obtener medidas:', error);
  } finally {
    connection.release();
  }
};

// Crear una nueva medida
export const crearMedida = async ({ nombremedida, descripcion }) => {
  const connection = await pool.connect();
  try {
    const result = await connection.query(
      "INSERT INTO medidas (nombremedida, descripcion) VALUES ($1, $2)",
      [nombremedida, descripcion]
    );
    return result.rows[0]; // Retorna la medida creada
  } catch (error) {
    console.error('Error al crear medida:', error);
  } finally {
    connection.release();
  }
};

// Obtener una medida específica por ID
export const obtenerMedida = async (idmedida) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(
      "SELECT * FROM medidas WHERE idmedida = $1",
      [idmedida]
    );
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error('Error al obtener medida:', error);
  } finally {
    connection.release();
  }
};

// Modificar una medida existente
export const modificarMedida = async ({ idmedida, nombremedida, descripcion }) => {
  const connection = await pool.connect();
  try {
    const result = await connection.query(
      "UPDATE Medidas SET NombreMedida = $2, Descripcion = $3 WHERE IDMedida = $1",
      [idmedida, nombremedida, descripcion]
    );
    return result.rows[0]; // Retorna la medida actualizada
  } catch (error) {
    console.error('Error al actualizar medida:', error);
  } finally {
    connection.release();
  }
};

// Eliminar una medida
export const eliminarMedida = async (idmedida) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "DELETE FROM Medidas WHERE IDMedida = $1",
      [idmedida]
    );
  } catch (error) {
    console.error('Error al eliminar medida:', error);
  } finally {
    connection.release();
  }
};

export const obtenerMedidasArray = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query("SELECT * FROM medidas ORDER BY idmedida ASC");
    return rows.map(row => ({value: row.idmedida, label: row.nombremedida}));
  } catch (error) {
    console.error(error);
    return []; // Devuelve un array vacío en caso de error
  } finally {
    connection.release();
  }
};