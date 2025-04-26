// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { createUser, readJson, saveUserInfo } from "@/helpers/no usar/json_routes";
import { Bot_SendKeyboard, Bot_SendMessage } from "@/helpers/message";
import { changeUserStatus, createUser, findUser, resetUser } from "@/helpers/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = {
    id:1,
    book_id:1,
    case_id:1,
    stage_id:1
  }

  
  try{
    const {body} = req

    // await updateUserV2(1,['book_id','case_id'],[10,10])
    // await Bot_SendKeyboard('hola',1568853312,['pedro','juan','diego'])
    return res.status(200).json(body)

  }catch(err){
    return res.status(400).json(err)
  }
}


