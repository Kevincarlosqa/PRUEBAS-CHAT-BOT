import { prisma } from "@/lib/prisma";
import { Bot_sendKeyboard, Bot_sendMsg, Bot_sendMsgBadChoice } from "../api/message";
import { badResponse, errorResponse } from "../api/response";
import { stage_data } from "../types/stages";
import { updateStage } from "./helpers";
import { stage_09 } from "./stage_09";
import { stage_start } from "./stage_start";

//* MENU DIAGNOSTICO
  export const stage_04 = async (inputInfo:stage_data) => {
    const { caseId, userId, botIndex, id } = inputInfo

    if(!caseId) return console.log('CaseId null en stage_04')

    try{
      const answers = await prisma.answer.findMany({
        where:{cases:{some:{caseId}}}
      })
      
      const list = answers.map( el => el.name)
      const text = 'Selecciona la respuesta correcta'
      
      await Bot_sendKeyboard(text,userId,botIndex,list)
      await updateStage(id,3)
    }catch{
      errorResponse(`Error en el stage04`,inputInfo)
    }
  }


//* RESPUESTA MENU DIAGNOSTICO
  export const stage_05 = async (inputInfo:stage_data) => {
    const { input, userId, botIndex, caseId } = inputInfo

    if(!caseId) return console.log('caseId null en stage_05')

    try{
      const { isCorrect } = await prisma.answersOnCases.findFirst({
        where:{caseId,answer:{name:input}}
      }) || {isCorrect:false}
      
      if( isCorrect ){
        const correctAnswers = await prisma.answersOnCases.findMany({
          where:{caseId,isCorrect:true},
          select:{answer:{select:{name:true}}}
        })

        const answersText = correctAnswers.map(({answer}) => answer.name).join('\n')
        const text = `✅ Excelente. Tu diagnóstico fue correcto.\n\nRespuestas correctas del caso:\n${answersText}\n\nPuedes seguir revisando la bibliografía o volver a analizar el caso.`
        await Bot_sendMsg(text,userId,botIndex)
        return await stage_start(inputInfo)
      }
      const text = '😬 Esa respuesta no fue la correcta. Puedes pedir más información o revisar la bibliografía para reforzar el diagnóstico.'
      
      await Bot_sendMsg(text,userId,botIndex)
      await stage_06(inputInfo)
    }catch{
      errorResponse(`Error en el stage05`,inputInfo)
    }
  }
  
  //* MENU INCORRECTO
  const options = [
    'Mas Informacion',
    'Saber la respuesta'
  ]
  const maxErrors = 3

  export const stage_06 = async (inputInfo:stage_data) => {
    const { errors, userId, botIndex, id } = inputInfo
    const text = 'Por favor selecciona una opcion'
    const opts = errors < maxErrors ? [options[0]] : options
    try{
      await prisma.step.update({
        where:{id},data:{errors:{increment:1}}
      })
      await Bot_sendKeyboard(text,userId,botIndex,opts) 
      await updateStage(id,4)
    }catch{
      errorResponse(`Error en el stage06`,inputInfo)
    }
  }

//* RESPUESTA MENU INCORRECTO
  export const stage_07 = async (inputInfo:stage_data) => {
    const { input, userId, botIndex, errors } = inputInfo
    const choice = options.indexOf(input)
    const validate = errors < maxErrors && input === options[1] || choice === -1

    try{
      if( validate ){
        await Bot_sendMsgBadChoice(userId,botIndex)
        return await stage_06(inputInfo)
      }
      
      const foos = [
        stage_09,
        stage_08,
      ]
      
      await foos[choice](inputInfo)
    }catch{
      errorResponse(`Error en el stage07`,inputInfo)
    }
  }

//* SABER LA RESPUESTA
  export const stage_08 = async (inputInfo:stage_data) => {
    const {userId,botIndex,id} = inputInfo
    try{
      const result = await prisma.step.findUnique({
        where:{id},
        select:{
          case: {select:{answers:{where:{isCorrect:true},select:{answer:{select:{name:true}}}}}}
        }
      })
      if(!result) return console.log('no hay coincidencias')
      if(!result.case) return console.log('no hay coincidencias')
      
      const answer = result.case.answers[0].answer.name
      
      const text = `La respuesta al caso es: ${answer}`
      
      await Bot_sendMsg(text,userId,botIndex)
      await stage_start(inputInfo)
    }catch{
      errorResponse(`Error en el stage08`,inputInfo)
    }
  }