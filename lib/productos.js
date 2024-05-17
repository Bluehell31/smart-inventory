"use server";
import { pool } from "@/bd";

export const obtenerProductos = async () => {
  const connection = await pool.connect();
  try {
    const query = `
      SELECT
        pro.idproducto,
        pro.nombre AS nombre_producto,
        pro.descripcion AS descripcion_producto,
        pro.precio,
        cat.nombrecategoria AS nombre_categoria,
        prov.nombreproveedor AS nombre_proveedor,
        med.nombremedida AS nombre_medida,
        usr.nombreusuario AS nombre_usuario
      FROM productos pro
      INNER JOIN categorias cat ON pro.idcategoria = cat.idcategoria
      INNER JOIN proveedores prov ON pro.idproveedor = prov.idproveedor
      INNER JOIN medidas med ON pro.idmedida = med.idmedida
      INNER JOIN usuarios usr ON pro.usuariocreador = usr.idusuario
      ORDER BY pro.idproducto ASC;
    `;
    const { rows } = await connection.query(query);
    return rows;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
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
      [
        nombre,
        descripcion,
        precio,
        idcategoria,
        idmedida,
        idproveedor,
        usuariocreador,
      ]
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
      "SELECT * FROM productos WHERE idproducto = $1",
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
    await connection.query(
      "UPDATE productos SET nombre=$2, descripcion=$3, precio=$4, idcategoria=$5, idmedida=$6, idproveedor=$7, usuariocreador=$8 WHERE idproducto=$1",
      [
        idproducto,
        nombre,
        descripcion,
        precio,
        idcategoria,
        idmedida,
        idproveedor,
        usuariocreador,
      ]
    );
  } catch (error) {
    console.error(error);
  }
};

export const eliminarProducto = async (idproducto) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "DELETE FROM productos WHERE idproducto = $1::INTEGER",
      [idproducto]
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const obtenerProductosArray = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query("SELECT * FROM productos ORDER BY idproducto ASC");
    return rows.map(row => ({value: row.idproducto, label: row.nombre})); 
  } catch (error) {
    console.error(error);
    return []; // Devuelve un array vacío en caso de error
  } finally {
    connection.release();
  }
};
