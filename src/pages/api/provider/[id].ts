import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";
import { title } from "process";
import { dir } from "console";
export default async(req: NextApiRequest,res: NextApiResponse)=>{
const { method,query,body }= req;

switch(method){
    case "GET":
        try {
            const text='SELECT * FROM proveedores where idproveedor= $1';
            const values=[query.id];
            const result =await conn.query(text,values);

        if(result.rows.lenght ===0)
            return res.status(404).json({message:"Provider not found"});
        return res.json(result.rows[0]);
        } catch (error:any) {
            return res.status(500).json({message: error.message});
        }
        
    case "PUT":
        try {
            const {nombreproveedor, direccion, telefono, email}=body;
            const text='UPDATE proveedores SET nombreproveedor=$1, direccion=$2, telefono=$3, email=$4 where idproveedor= $5';
            const values=[nombreproveedor,direccion,telefono,email,query.id];
            const result =await conn.query(text,values);

        if(result.rows.lenght ===0)
            return res.status(404).json({message:"Provider not found"});
        return res.json(result.rows[0]);
        } catch (error:any) {
            return res.status(500).json({message: error.message});
        }
    case "DELETE":
        try {
            const text='DELETE FROM proveedores where idproveedor= $1';
            const values=[query.id];
            const result =await conn.query(text,values);
            

        if(result.rows.lenght ===0)
            return res.status(404).json({message:"Provider not found"});
        return res.json(result.rows[0]);
        } catch (error:any) {
            return res.status(500).json({message: error.message});
        }
        
    default:
        return res.status(400).json("METHOD NOT ALLOWED");
}

};
