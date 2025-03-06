import { PrismaClient } from "@prisma/client"
import { UserMode } from "./types"
import { use } from "react"

const prisma = new PrismaClient()

export const createUser = async (chat_id:number) => {
  const data:UserMode = {
    book_id:0,
    case_id:0,
    stage_id:0,
    id:chat_id
  }
  await prisma.user.create({data})
}

export const findUser = async (chat_id:number) => {
  return await prisma.user.findFirst({where:{id:chat_id}})
}

export const updateUser = async (chat_id:number,prop: keyof UserMode, value: number) => {
  await prisma.user.update({where:{id:chat_id},data:{[prop]:value}})
}

export const resetUser = async (chat_id:number) => {
  const data:UserMode = {
    book_id:0,
    case_id:0,
    stage_id:1,
    id:chat_id
  }
  await prisma.user.update({where:{id:chat_id},data})
}

export const getUserStatus = async (chat_id:number) => {
  const user = await findUser(chat_id)
  return !user ? 0 : user.stage_id
}