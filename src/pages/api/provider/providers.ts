import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM proveedores";
        const response = await conn.query(query);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    case "POST":
      const { nombreproveedor, direccion, telefono, email } = body;

      // Use parameterized query to avoid SQL injection
      const query =
        "INSERT INTO proveedores(nombreproveedor, direccion, telefono, email) VALUES ($1, $2, $3, $4) RETURNING *";
      const values = [nombreproveedor, direccion, telefono, email];

      try {
        const response = await conn.query(query, values);
        return res
          .status(200)
          .json({
            message: "Creating provider successfully",
            data: response.rows[0],
          }); // response.rows[0] contiene los datos insertados
      } catch (error:any) {
        console.error("Error creating provider:", error);
        // Enviar un mensaje de error específico
        return res
          .status(500)
          .json({ error: "Error creating provider", message: error.message });
      }

    default:
      return res.status(400).json("METHOD NOT AVAILABLE");
  }
};
