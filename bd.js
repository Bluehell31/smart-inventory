import { Pool } from "pg";
export const pool = new Pool({
  user: "postgres",
  password: "mateo3107",
  host: "localhost",
  port: 5432,
  database: "smartInventory",
});
