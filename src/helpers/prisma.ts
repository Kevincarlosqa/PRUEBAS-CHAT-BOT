import { PrismaClient } from "@prisma/client"
import { User_DB } from "./types"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
    process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const createUser = async (user_id:number) => {
  const data:User_DB = {
    book_id:0,
    case_id:0,
    stage_id:0,
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
    stage_id:-1,
    id:user_id
  }
  await prisma.user.update({where:{id:user_id},data})
}


export const addEmbeddings = async (data:{book_id:number,vector:number[]}[]) => {
  const values = data.map(el => `(${el.book_id}, '${JSON.stringify(el.vector)}')`).join(', ')
  const query = `INSERT INTO "Embedding" (book_id, vector) VALUES ${values}`

  try{
    const res = await prisma.$executeRawUnsafe(query);
    console.log(res)
  } catch (error){
    console.error('tmr')
  }finally{
    await prisma.$disconnect()
  }
}
