import { PrismaClient } from "@prisma/client"
import { User_DB } from "./types"
import { env } from "process";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const createUser = async (user_id:number) => {
  const data:User_DB = {
    book_id:0,
    case_id:0,
    stage_id:1,
    id:user_id
  }
  await prisma.user.create({data})
}

export const findUser = async (user_id:number) => {
  return await prisma.user.findUnique({where:{id:user_id}})
}

export const updateUser = async (user_id:number,props:(keyof User_DB)[], values: number[]) => {

  const newVals:Partial<User_DB> = {}
  props.forEach((prop,ix) => {
    newVals[prop] = values[ix]
  })

  await prisma.user.update({where:{id:user_id},data:{...newVals}})
}

export const changeUserStatus = async (user_id:number, status: number)=>{
  await updateUser(user_id,["stage_id"],[status])
}


export const resetUser = async (user_id:number) => {
  const data:User_DB = {
    book_id:0,
    case_id:0,
    stage_id:1,
    id:user_id
  }
  await prisma.user.update({where:{id:user_id},data})
}
