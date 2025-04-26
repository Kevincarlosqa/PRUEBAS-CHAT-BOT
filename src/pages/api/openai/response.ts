// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { createUser, readJson, saveUserInfo } from "@/helpers/no usar/json_routes";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = new OpenAI();
  
  try{
    const {body} = req
    const {input} = body
    const response = await client.responses.create({
        model: "gpt-3.5-turbo",
        instructions: "Habla como un dentista",
        input
    });
    
    return res.status(200).json(response)

  }catch(err){
    return res.status(400).json(err)
  }
}


