import { Bot_sendKeyboard, Bot_sendMsg, Bot_sendMsgBadChoice, Bot_sendPhoto } from "../api/message";
import { prisma } from "../db/prisma";
import { stage_data } from "../types/stages";
import { updateStage } from "./helpers";
import { stage_04 } from "./stage_04";
import { stage_11 } from "./stage_11";


//* MENU MAS INFORMACION
  const options = [
    'Antecedentes',
    'Historia de Progrecion',
    'Dolencia',
    'Radiografias clinicas',
    'Fotografias clinicas',
    'Consultar Bibliografia',
    'Dar respuesta',
  ]
  const len = options.length-1

  export const stage_09 = async (inputInfo:stage_data) => {
    const { userId, botIndex, id } = inputInfo
    const text= 'Por favor selecciona una opcion'

    await Bot_sendKeyboard(text,userId,botIndex,options)
    await updateStage(id,5)
  }

//* RESPUESTA AL MENU MAS INFORMACION

  export const stage_10 = async (inputInfo:stage_data) => {
    const { input, userId, botIndex, caseId } = inputInfo
    const choice = options.indexOf(input)

    const select = choice === 3 // si es true son radiografias
    if(select || choice === 4) {
      const list = await prisma.image.findMany({ where:{ caseId, type: select }})
      
      if(!list) {
        const tipoImg = select ? 'Radiografias' : 'Fotografias'
        await Bot_sendMsg(`No hay ${tipoImg} para este caso`,userId,botIndex)
        return stage_09(inputInfo)
      }

      list.forEach( async el => {
        const {url,info} = el
        await Bot_sendMsg(info,userId,botIndex)
        await Bot_sendPhoto(url,userId,botIndex)
      })

      return stage_09(inputInfo)
    }

    if(choice === len) return await stage_04(inputInfo) // menu dar respuersta
    
    if(choice === (len-1)) return await stage_11(inputInfo) // menu de consulta bibliografica

    if( choice === -1 ) { // Respuesta invalida
      await Bot_sendMsgBadChoice(userId,botIndex)
      return await stage_09(inputInfo)
    }
    
    const {background,history,pain} = await prisma.case.findFirst({where:{id:caseId}}) || {background:'',history:'',pain:''}

    if (choice === 0) await Bot_sendMsg(background,userId,botIndex) // Enviar antecedentes

    if (choice === 1) await Bot_sendMsg(history,userId,botIndex) // enviar historial

    if (choice === 2) await Bot_sendMsg(pain,userId,botIndex) // enviar dolor :C

    await stage_09(inputInfo)
  }
