import { dataCreateMany } from "@/helpers/hardInfo";
import { addEmbeddings } from "@/helpers/prisma";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // console.log(req)
  try{
    await addEmbeddings(dataCreateMany)
    // console.log('chi')
    return res.status(200).json({});
  }catch(err){
    return res.status(400).json(err)
  }

}
