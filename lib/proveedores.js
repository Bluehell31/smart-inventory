"use server";
import { pool } from "@/bd";

export const obtenerProveedores = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query("SELECT * FROM proveedores ORDER BY idproveedor ASC");
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const crearProveedor = async ({
  nombreproveedor,
  direccion,
  telefono,
  email,
}) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "INSERT INTO proveedores (nombreproveedor,direccion,telefono,email) VALUES ($1, $2, $3, $4)",
      [nombreproveedor, direccion, telefono, email]
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const obtenerProveedor = async (idproveedor) => {
  const connection = await pool.connect();
  try {
    const { rowCount, rows } = await connection.query(
      "SELECT * FROM proveedores WHERE idproveedor = $1",
      [idproveedor]
    );
    return rowCount ? rows[0] : null;
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

export const modificarProveedor = async ({
  idproveedor,
  nombreproveedor,
  direccion,
  telefono,
  email,
}) => {
  const connection = await pool.connect();
  try {
    await connection.query("UPDATE proveedores SET nombreproveedor=$2,direccion=$3,telefono=$4,email=$5 WHERE idproveedor=$1", [
      idproveedor,
      nombreproveedor,
      direccion,
      telefono,
      email,
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const obtenerProveedoresArray = async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query("SELECT * FROM proveedores ORDER BY idproveedor ASC");
    return rows.map(row => ({value: row.idproveedor, label: row.nombreproveedor}));
  } catch (error) {
    console.error(error);
    return []; // Devuelve un array vacío en caso de error
  } finally {
    connection.release();
  }
};

export const eliminarProveedor = async (idproveedor) => {
  const connection = await pool.connect();
  try {
    await connection.query(
      "DELETE FROM proveedores WHERE idproveedor = $1::INTEGER",
      [idproveedor]
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};
