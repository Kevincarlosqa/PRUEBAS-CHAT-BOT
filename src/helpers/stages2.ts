import { userInfo } from "os"
import { Bot_BadOptionMessage, Bot_SendKeyboard, Bot_SendMessage } from "./message"
import { createUser, prisma, resetUser, updateUser } from "./prisma"

const updateStage = async (user_id:number,stage_id:number) => {
  await updateUser(user_id,["stage_id"],[stage_id])
}

//* MENSAJE DE BIEBENIDA PARA LOS NUEVOS USUARIOS
export const foo_stage_msg = async (user_id:number,name:string) => {
  const text = `¡Bienvenido ${name}! 
      Nos alegra tenerte aquí. Este espacio ha sido diseñado especialmente para que puedas aprender, explorar y fortalecer tus conocimientos en odontología a través del análisis de casos clínicos reales.
      Aquí no solo encontrarás información, sino también herramientas para reflexionar, cuestionar y aplicar lo aprendido en situaciones concretas. Queremos acompañarte en cada paso de tu proceso formativo, brindándote contenidos claros, prácticos y actualizados.
      Prepárate para observar, pensar y decidir como un profesional. ¡Comencemos!`
  
  await Bot_SendMessage(text,user_id)
  await createUser(user_id)
  await foo_stage_start(user_id)
}

//* ESTADO DE INICIO PARA EMPEZAR CON LOS CASOS
export const foo_stage_start = async (user_id:number) => {
  const text = 'Escribe cualquier mensaje para continuar'
  await Bot_SendMessage(text,user_id)
  await updateStage(user_id,0)
}

//* STAGE 00: ENVIO DE CASOS DISPONIBLES EN LA DB
export const foo_stage00 = async (user_id:number) => {
  const list = await prisma.case.findMany({
    select:{
      title:true
    }
  })

  const text = 'Selecciona el caso que desees resolver'
  const list_cases = list.map(el => el.title)
  
  await Bot_SendKeyboard(text,user_id,list_cases)
  await updateStage(user_id,1)
}

//* STAGE 01: RESPUESTA PARA CASOS DISPONIBLES
export const foo_stage01 = async (user_id:number,title_case:string) => {
  const caso = await prisma.case.findFirst({where:{title:title_case}})
  if(!caso) {
    await Bot_BadOptionMessage(user_id)
    return foo_stage00(user_id)
  }

  const {id:case_id,title,exam} = caso
  const text = `${exam}`
  await Bot_SendMessage(exam,user_id)
  await updateUser(user_id,['case_id','stage_id'],[case_id,2])
  await foo_stage02(user_id)

}

//* STAGE 02: MENU GENERAL DEL CASO
const stage02_options = [
  'Mas Informacion',
  'Consultar Bibliografia',
  'Listo para mi diagnostico 😎',
  'Nuevo Caso 😞',
]
export const foo_stage02 = async (user_id:number) => {
  const text = 'Por favor selecciona una opcion'
  await Bot_SendKeyboard(text,user_id,stage02_options)
  await updateStage(user_id,3)
}

//* STAGE 03: RESPUESTA AL MENU GENERAL DEL CASO
export const foo_stage03 = async (user_id:number,input:string) => {
  const nextStage = stage02_options.indexOf(input)
  if(nextStage === -1){
    await Bot_BadOptionMessage(user_id)
    return await foo_stage02(user_id)
  }

  if(nextStage == 0){ // MENU mas informacion
    await updateStage(user_id,4)
    return await foo_stage04(user_id)
  }
  if(nextStage == 1){ // MENU  bibliogrfia
    await updateStage(user_id,6)
    return await foo_stage06(user_id)
  }
  if(nextStage == 2){ // CONSULTA de diagnostico
    await updateStage(user_id,10)
    return await foo_stage10(user_id)
  }
  if(nextStage == 3){ // CAMBIAR DE CASO
    await resetUser(user_id)
    return await foo_stage_start(user_id)
  }
}

//* STAGE 04: MENU DE MAS INFORMACION
const stage04_options = [
  'Paciente',
  'Ver Fotografias'
]

export const foo_stage04 = async (user_id:number) => {
  const text = 'Por favor selecciona una opcion'
  await Bot_SendKeyboard(text,user_id,stage04_options)
  await updateStage(user_id,5)
}

//* STAGE 05: RESPUESTA AL MENU DE MAS INFORMACION
export const foo_stage05 = async (user_id:number,input:string) => {
  const nextStage = stage04_options.indexOf(input)
  if(nextStage === -1){
    await Bot_BadOptionMessage(user_id)
    return await foo_stage04(user_id)
  }
  
  if(nextStage == 0){ // MENU fotogra
    await updateStage(user_id,6)
    return await foo_stage04(user_id)
  }
}

//* STAGE 06: MENU DE IMAGENES
export const foo_stage06 = async (user_id:number) => {}

//* STAGE 07: RESPUESTA MENU DE IMAGENES
export const foo_stage07 = async (user_id:number) => {}



//* STAGE 08: MENU DE BIBLIOGRAFIA
export const foo_stage08 = async (user_id:number) => {}

//* STAGE 09: RESPUESTA AL MENU DE BIBLIOGRAFIA
export const foo_stage09 = async (user_id:number) => {}

//* STAGE 10: CONSULTA A BIBLIOGRAFIA
export const foo_stage10 = async (user_id:number) => {}

//* STAGE 11: RESPUESTA A BIBLIOGRAFIA
export const foo_stage11 = async (user_id:number) => {}


//* STAGE 12: CONSULTA DE DIAGNOSTICO
export const foo_stage12 = async (user_id:number) => {}

//* STAGE 13: RESPUESTA DE DIAGNOSTICO
export const foo_stage13 = async (user_id:number) => {}

export const foo_stage14 = async (user_id:number) => {}
export const foo_stage15 = async (user_id:number) => {}
export const foo_stage16 = async (user_id:number) => {}
export const foo_stage17 = async (user_id:number) => {}
