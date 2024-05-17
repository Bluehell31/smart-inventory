"use server";
import { pool } from "@/bd";  // Asegúrate de que la ruta a la base de datos es correcta

// Función para obtener el inventario agrupado por bodega
export const obtenerInventario= async () => {
  const connection = await pool.connect();
  try {
    const { rows } = await connection.query(`
    SELECT
    b.idbodega,
    b.nombrebodega,
    p.nombre AS nombreproducto,
    i.cantidad
  FROM
    inventario i
    JOIN bodegas b ON i.idbodega = b.idbodega
    JOIN productos p ON i.idproducto = p.idproducto
  ORDER BY
    b.idbodega, p.nombre;
  
    `);
    return rows;
  } catch (error) {
    console.error('Error al obtener el inventario por bodega:', error);
    return [];
  } finally {
    connection.release();
  }
};


