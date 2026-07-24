import { prisma } from "@/lib/prisma"
import { badResponse, consoleError, errorResponse } from "../api/response"
import { intSteps } from "../types/models"

// Manejo de usuarios
  export const findUser = async (id:string) => {
    try{
      return await prisma.user.findFirst({where:{id}})
    }catch(err){
      consoleError(err)
      errorResponse(`Error al buscar el usuario ${id}`)
    }
  }

  export const createUser = async (userId:string,name:string) => {
    try{
      return await prisma.user.create({data:{id:userId,name}})
    }catch(err){
      consoleError(err)
      errorResponse(`Error al crear el usuario ${name}`)
    }
  }

  export const createStep = async (userId:string,themeId:number) => {
    const data = {
      userId,themeId,
      stage:0,
      errors:0,
    }
    try{
      await prisma.step.create({data})
    }catch (err){
      consoleError(err)
      errorResponse(`Error al crear el step ${userId}-${themeId}`)
    }
  }

  export const resetStep = async (stepId:number) => {
    const data = {
      stage:0,
      errors:0,
      caseId:null,
      paperId:null,
      selectedTooth:null,
      solvedTeeth:[],
    }
    try{
      await prisma.step.update({where:{id:stepId},data})
    }catch (err){
      consoleError(err)
      errorResponse(`Error al resetear el step ${stepId}`)
    }
  }

  export const updateStep = async (stepId:number,data:intSteps) => {
    try{
      await prisma.step.update({where:{id:stepId},data})
    }catch(err){
      consoleError(err)
      errorResponse(`Error al actualizar el step ${stepId}`)
    }
  }

  export const updateStage = async (stepId:number,stage:number) => {
    const data = {stage}
    try{
      await updateStep(stepId,data)
    }catch(err){
      consoleError(err)
      errorResponse(`Error al actualizar el stage del step ${stepId}`)
    }
  }