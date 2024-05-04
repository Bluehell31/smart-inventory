"use server";
import { pool } from "@/bd"; // Asegúrate de que este es el camino correcto para importar tu conexión de base de datos

// Obtener todas las medidas
export const obtenerMedidas = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query("SELECT * FROM Medidas ORDER BY IDMedida ASC");
    return rows;
  } catch (error) {
    console.error('Error al obtener medidas:', error);
  } finally {
    connection.release();
  }
};

// Crear una nueva medida
export const crearMedida = async ({ nombreMedida, descripcion }) => {
  const connection = await pool.connect();
  try {
    const result = await connection.query(
      "INSERT INTO Medidas (NombreMedida, Descripcion) VALUES ($1, $2) RETURNING *",
      [nombreMedida, descripcion]
    );
    return result.rows[0]; // Retorna la medida creada
  } catch (error) {
    console.error('Error al crear medida:', error);
  } finally {
    connection.release();
  }
};

// Obtener una medida específica por ID
export const obtenerMedida = async (idMedida) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(
      "SELECT * FROM Medidas WHERE IDMedida = $1",
      [idMedida]
    );
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error('Error al obtener medida:', error);
  } finally {
    connection.release();
  }
};

// Modificar una medida existente
export const modificarMedida = async ({ idMedida, nombreMedida, descripcion }) => {
  const connection = await pool.connect();
  try {
    const result = await connection.query(
      "UPDATE Medidas SET NombreMedida = $2, Descripcion = $3 WHERE IDMedida = $1 RETURNING *",
      [idMedida, nombreMedida, descripcion]
    );
    return result.rows[0]; // Retorna la medida actualizada
  } catch (error) {
    console.error('Error al actualizar medida:', error);
  } finally {
    connection.release();
  }
};

// Eliminar una medida
export const eliminarMedida = async (idMedida) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "DELETE FROM Medidas WHERE IDMedida = $1",
      [idMedida]
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