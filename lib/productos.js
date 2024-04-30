"use server";
import { pool } from "@/bd";

export const obtenerProductos = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query("SELECT * FROM productos ORDER BY idproducto ASC");
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const crearProducto = async ({
  nombre,
  descripcion,
  precio,
  idcategoria,
  idmedida,
  idproveedor,
  usuariocreador,
}) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "INSERT INTO productos (nombre, descripcion, precio, idcategoria, idmedida, idproveedor, usuariocreador) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [nombre, descripcion, precio, idcategoria, idmedida, idproveedor, usuariocreador]
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const obtenerProducto = async (idproducto) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(
      "SELECT * FROM productos WHERE IDProducto = $1",
      [idproducto]
    );
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const modificarProducto = async ({
  idproducto,
  nombre,
  descripcion,
  precio,
  idcategoria,
  idmedida,
  idproveedor,
  usuariocreador,
}) => {
  const connection = await pool.connect();
  try {
    await connection.query("UPDATE productos SET nombre=$2, descripcion=$3, precio=$4, idcategoria=$5, idmedida=$6, idproveedor=$7, usuariocreador=$8 WHERE IDProducto=$1", [
      idproducto,
      nombre,
      descripcion,
      precio,
      idcategoria,
      idmedida,
      idproveedor,
      usuariocreador
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const eliminarProducto = async (idproducto) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "DELETE FROM productos WHERE idproducto = $1",
      [idproducto]
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};
