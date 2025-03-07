// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { createUser, readJson, saveUserInfo } from "@/helpers/no usar/json_routes";
import { Bot_SendKeyboard, Bot_SendMessage } from "@/helpers/message";
import { changeUserStatus, createUser, findUser, resetUser } from "@/helpers/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient()

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
    // await updateUserV2(1,['book_id','case_id'],[10,10])
    await Bot_SendKeyboard('hola',1568853312,['pedro','juan','diego'])
    return res.status(200).json({message:'ok'})

  }catch(err){
    return res.status(400).json(err)
  }

  // const route = genHTTP('getMe')
  // try{
  //   const {data} = await axios.get(genHTTP('getWebhookInfo'))
  //   res.status(200).json(data)
  // }catch(err){
  //   console.log(err)
  // }
}


/*
  Requerimientos:
    - Saber si el usuario existe
    - Traer la informacion del usuario
    - ACtualizar la informacion del usuario
    - 

  Crear Usuario: 
    const user = await prisma.user.create({data})

  Buscar uno: 
    const user = await prisma.usr.findUnique({
      where:{
        email: ''
      }  
    })

  Actualizar 
    const updateUser = await prisma.user.update({
      where:{
        email: ''
      },
      data:{
        name:''
      }
    })

*/