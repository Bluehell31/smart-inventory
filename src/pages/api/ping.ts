// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {conn} from '../../utils/database';
import { time } from "console";
type Data={
  message: string;
  time: string;
}

export default async(req:NextApiRequest, res:NextApiResponse<Data>)=>{

  const response= await conn.query('SELECT NOW()')

  console.log(response)

  return res.json({message:"Pong", time:response.rows[0].now});

};