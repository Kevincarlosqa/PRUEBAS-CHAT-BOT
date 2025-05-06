import { PrismaClient } from "@prisma/client"
import { User_DB } from "./types"
import { DB_User_Topic } from "@/types/prisma";
import { useTransition } from "react";
import PreviousMap_ from "postcss/lib/previous-map";
import { topicsList } from "@/pages/api/telegram/infoBots";

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



const topicTables = {
  1:prisma.users_Topic_01,
  2:prisma.users_Topic_02,
  3:prisma.users_Topic_03,
  4:prisma.users_Topic_04,
  5:prisma.users_Topic_05,
  6:prisma.users_Topic_06,
  7:prisma.users_Topic_07,
  8:prisma.users_Topic_08,
  9:prisma.users_Topic_09,
  10:prisma.users_Topic_10,
  11:prisma.users_Topic_11,
  12:prisma.users_Topic_12,
  13:prisma.users_Topic_13,
  14:prisma.users_Topic_14,
  15:prisma.users_Topic_15,
} as const;


export type TopicKeys = keyof typeof topicTables
type TopicModels = (typeof topicTables)[TopicKeys]
type PropVal = number | null

// USERS
  export const createUser = async (idUser:number, idTopic:TopicKeys) => {
    const data:DB_User_Topic = {
      id: idUser,
      idStage: 0,
      idBook: 0,
      idCase: 0
    }
    const table:TopicModels = topicTables[idTopic]

    await table.create({data})
  }


  export const findUser = async (idUser:number, idTopic:TopicKeys) => {
    const table:TopicModels = topicTables[idTopic];
    //@ts-ignore
    return await table.findUnique({where:{id:idUser}})
  }

  export const updateUser = async (idUser:number, idTopic:TopicKeys, idStage?:PropVal, idBook?:PropVal, idCase?:PropVal) => {

    const table:TopicModels = topicTables[idTopic]
    //@ts-ignore
    let newVals = {}//await table.findUnique({where:{id:idUser}})

    if(idStage) newVals = {...newVals,idStage}
    if(idBook) newVals = {...newVals,idBook}
    if(idCase) newVals = {...newVals,idCase}
    
    //@ts-ignore
    await table.update({where:{id:idUser,data:newVals}}) 
  }

  export const resetUser = async (idUser:number, idTopic:TopicKeys) => {
    const data:DB_User_Topic = {
      idStage:0,
      idCase:0,
      idBook:-1,
      id:idUser
    }
    const table:TopicModels = topicTables[idTopic]
    //@ts-ignore
    await table.update({where:{id:user_id},data})
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

// INFO




// export const createUser = async (user_id:number) => {
//   const data:User_DB = {
//     book_id:0,
//     case_id:0,
//     stage_id:0,
//     id:user_id
//   }
//   await prisma.user.create({data})
// }

// export const findUser = async (user_id:number) => {
//   return await PrismaTables[''].findUnique({where:{id:user_id}})
// }

// export const updateUser1 = async (user_id:number,props:(keyof User_DB)[], values: number[]) => {

//   const newVals:Partial<User_DB> = {}
//   props.forEach((prop,ix) => {
//     newVals[prop] = values[ix]
//   })

//   // await prisma.user.update({where:{id:user_id},data:{...newVals}})
// }

// export const changeUserStatus = async (user_id:number, status: number)=>{
//   // await updateUser(user_id,["stage_id"],[status])
// }


// export const resetUser1 = async (user_id:number) => {
//   const data:User_DB = {
//     book_id:0,
//     case_id:0,
//     stage_id:-1,
//     id:user_id
//   }
//   // await prisma.user.update({where:{id:user_id},data})
// }


