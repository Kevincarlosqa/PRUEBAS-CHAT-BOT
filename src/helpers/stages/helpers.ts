import { prisma } from "../db/prisma"
import { intSteps } from "../types/models"

// Manejo de usuarios
  export const findUser = async (id:number) => {
    return await prisma.user.findFirst({where:{id}})
  }

  export const createUser = async (userId:bigint,name:string) => {
    return await prisma.user.create({data:{id:userId,name}})
  }

// Manejo de pasos (usuario-tema)
  export const findStep = async (userId:bigint,themeId:number) => {
    return await prisma.step.findFirst({where:{userId,themeId}})
  }

  export const createStep = async (userId:bigint,themeId:number) => {
    const data = {
      userId,themeId,
      caseId:0,
      paperId:0,
      stage:0,
      errors:0,
    }
    await prisma.step.create({data})
  }

  export const resetStep = async (stepId:number) => {
    const data = {
      caseId:0,
      paperId:0,
      stage:0,
      errors:0,
    }
    await prisma.step.update({where:{id:stepId},data})
  }

  export const updateStep = async (stepId:number,data:intSteps) => {
    await prisma.step.update({where:{id:stepId},data})
  }

  export const updateStage = async (stepId:number,stage:number) => {
    const data = {stage}
    await updateStep(stepId,data)
  }