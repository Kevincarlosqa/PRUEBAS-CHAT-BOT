// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUser, readJson, saveUserInfo } from "@/helpers/json_routes";
import type { NextApiRequest, NextApiResponse } from "next";


type Data = {
  message: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try{
    await saveUserInfo(12320928741000,10,200000)
    const data = await readJson()
  
    res.status(200).json(data)
  }catch(err){
    console.log(err)
  }

  // const route = genHTTP('getMe')
  // try{
  //   const {data} = await axios.get(genHTTP('getWebhookInfo'))
  //   res.status(200).json(data)
  // }catch(err){
  //   console.log(err)
  // }
}
