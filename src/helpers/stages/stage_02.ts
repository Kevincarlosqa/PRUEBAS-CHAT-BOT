import { Bot_sendKeyboard, Bot_sendMsgBadChoice } from "../api/message";
import { errorResponse } from "../api/response";
import { stage_data } from "../types/stages";
import { updateStage } from "./helpers";
import { stage_04 } from "./stage_04";
import { stage_09 } from "./stage_09";


//* MENU GENERAL DEL CASO
  const options = [
    'Dar respuesta 😎',
    'Necesito más informacion',
  ]

  export const stage_02 = async (inputInfo:stage_data) => {
    const { userId, botIndex, id } = inputInfo
    const text = 'Por favor selecciona una opcion'
    try{
      await Bot_sendKeyboard(text,userId,botIndex,options)
      await updateStage(id,2)
    }catch{
      errorResponse(`Error en el stage02`,inputInfo)
    }
  }



//* RESPUESTA AL MENU GENERAL DEL CASO
  export const stage_03 = async (inputInfo:stage_data) => {
    const {input,userId,botIndex} = inputInfo
    const choice = options.indexOf(input)
    try{

      if(choice === -1){
        await Bot_sendMsgBadChoice(userId,botIndex)
        return await stage_02(inputInfo)
      }
      
      const foos = [
        stage_04,
        stage_09,
      ]
      
      await foos[choice](inputInfo)
    }catch{
      errorResponse(`Errorr en el stage03`,inputInfo)
    }
  }