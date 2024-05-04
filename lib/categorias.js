"use server";
import { pool } from "@/bd";

export const obtenerCategorias = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query("SELECT * FROM categorias ORDER BY idcategoria ASC");
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const crearCategoria = async ({
  nombrecategoria,
  descripcion
}) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "INSERT INTO categorias (nombrecategoria, descripcion) VALUES ($1, $2)",
      [nombrecategoria, descripcion]
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const obtenerCategoria = async (idcategoria) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(
      "SELECT * FROM categorias WHERE idcategoria = $1",
      [idcategoria]
    );
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const modificarCategoria = async ({
  idcategoria,
  nombrecategoria,
  descripcion
}) => {
  const connection = await pool.connect();
  try {
    await connection.query("UPDATE categorias SET nombrecategoria=$2, descripcion=$3 WHERE idcategoria=$1", [
      idcategoria,
      nombrecategoria,
      descripcion
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const obtenerCategoriasArray = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query("SELECT * FROM categorias ORDER BY idcategoria ASC");
    return rows.map(row => ({value: row.idcategoria, label: row.nombrecategoria}));
  } catch (error) {
    console.error(error);
    return []; // Devuelve un array vacío en caso de error
  } finally {
    connection.release();
  }
};

export const eliminarCategoria = async (idcategoria) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "DELETE FROM categorias WHERE idcategoria = $1::INTEGER",
      [idcategoria]
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};
