"use server";
import { pool } from "@/bd";
export const obtenerUsuariosArray = async () => {
    const connection = await pool.connect();
    try {
      const { rows } = await connection.query("SELECT * FROM usuarios ORDER BY idusuario ASC");
      return rows.map(row => ({value: row.idusuario, label: row.nombreusuario}));
    } catch (error) {
      console.error(error);
      return []; // Devuelve un array vacío en caso de error
    } finally {
      connection.release();
    }
  };