import { userInfo } from "os"
import { Bot_BadOptionMessage, Bot_SendKeyboard, Bot_SendMessage, Bot_SendPhoto } from "./message"
import { createUser, prisma, resetUser, updateUser } from "./prisma"
import { StageInputParameters } from "@/pages/api/telegram/chatbot"
import { ansQuestion } from "./openAI"



const updateStage = async (user_id:number,stage_id:number) => {
  await updateUser(user_id,["stage_id"],[stage_id])
}

//* MENSAJE DE BIEBENIDA PARA LOS NUEVOS USUARIOS
export const foo_stage_msg = async (inputInfo:StageInputParameters) => {
  const {input,userId} = inputInfo
  const text = `¡Bienvenido ${input}! 
      Nos alegra tenerte aquí. Este espacio ha sido diseñado especialmente para que puedas aprender, explorar y fortalecer tus conocimientos en odontología a través del análisis de casos clínicos reales.
      Aquí no solo encontrarás información, sino también herramientas para reflexionar, cuestionar y aplicar lo aprendido en situaciones concretas. Queremos acompañarte en cada paso de tu proceso formativo, brindándote contenidos claros, prácticos y actualizados.
      Prepárate para observar, pensar y decidir como un profesional. ¡Comencemos!`
  
  await Bot_SendMessage(text,userId)
  await createUser(userId)
  await foo_stage_start(inputInfo)
}

//* ESTADO DE INICIO PARA EMPEZAR CON LOS CASOS
export const foo_stage_start = async (inputInfo:StageInputParameters) => {
  const {userId} = inputInfo
  const text = 'Escribe cualquier mensaje para iniciar'
  await Bot_SendMessage(text,userId)
  await updateStage(userId,0)
}

//* STAGE 00: ENVIO DE CASOS DISPONIBLES EN LA DB
export const foo_stage00 = async (inputInfo:StageInputParameters) => {
  const {userId} = inputInfo
  const list = await prisma.case.findMany({
    select:{
      title:true
    }
  })

  const text = 'Selecciona el caso que desees resolver'
  const list_cases = list.map(el => el.title)
  
  await Bot_SendKeyboard(text,userId,list_cases)
  await updateStage(userId,1)
}

//* STAGE 01: RESPUESTA PARA CASOS DISPONIBLES
export const foo_stage01 = async (inputInfo:StageInputParameters) => {
  const {userId,input:title_case} = inputInfo
  const caso = await prisma.case.findFirst({where:{title:title_case}})
  if(!caso) {
    await Bot_BadOptionMessage(userId)
    return foo_stage00(inputInfo)
  }

  const {id:case_id,exam} = caso
  await Bot_SendMessage(exam,userId)
  await updateUser(userId,['case_id'],[case_id])
  await foo_stage02(inputInfo)
}

//* STAGE 02: MENU GENERAL DEL CASO
const stage02_options = [
  'Mas Informacion',
  'Consultar Bibliografia',
  'Listo para mi diagnostico 😎',
  'Nuevo Caso 😞',
]
export const foo_stage02 = async (inputInfo:StageInputParameters) => {
  const {userId} = inputInfo
  const text = 'Por favor selecciona una opcion'
  await Bot_SendKeyboard(text,userId,stage02_options)
  await updateStage(userId,3)
}

//* STAGE 03: RESPUESTA AL MENU GENERAL DEL CASO
export const foo_stage03 = async (inputInfo:StageInputParameters) => {
  const {userId,input} = inputInfo
  const nextStage = stage02_options.indexOf(input || '')
  if(nextStage === -1){
    await Bot_BadOptionMessage(userId)
    return await foo_stage02(inputInfo)
  }
  const foos = [
    foo_stage04, // MENU mas informacion
    foo_stage08, // MENU bibliografia
    foo_stage12, // RECIBIR repuersta
    foo_stage_start, // Reiniciar
  ]

  await foos[nextStage](inputInfo)
}

//* STAGE 04: MENU DE MAS INFORMACION
const stage04_options = [
  'Mas informacion de paciente',
  'Ver Fotografias'
]
export const foo_stage04 = async (inputInfo:StageInputParameters) => {
  const {userId} = inputInfo
  const text = 'Por favor selecciona una opcion'
  await Bot_SendKeyboard(text,userId,stage04_options)
  await updateStage(userId,5)
}

//* STAGE 05: RESPUESTA AL MENU DE MAS INFORMACION
export const foo_stage05 = async (inputInfo:StageInputParameters) => {
  const {userId,input,caseId} = inputInfo
  const nextStage = stage04_options.indexOf(input || '')
  if(nextStage === -1){
    await Bot_BadOptionMessage(userId)
    return await foo_stage04(inputInfo)
  }
  
  if(nextStage == 0){ // ENVIO DE antecedentes
    const {ante} = await prisma.case.findUnique({where: {id:caseId}}) || {ante:''}
    await Bot_SendMessage(ante,userId)
    return await foo_stage02(inputInfo)
  }
  if(nextStage == 1){ // MENU fotografia
    return await foo_stage06(inputInfo)
  }
}

//* STAGE 06: MENU DE IMAGENES
export const foo_stage06 = async (inputInfo:StageInputParameters) => {
  const {userId,caseId} = inputInfo
  const images = await prisma.image.findMany({where: {case_id:caseId}})
  const text = 'Selecciona una imagen: '
  const listImages = images.map( el => {
    const {id,name,tipo} = el
    const base = tipo == 1 ? 'Radiografia' : 'Fotografia'
    return `${base} ${name} || ${id}`
  })

  await Bot_SendKeyboard(text,userId,listImages)
  await updateStage(userId,7)
}

//* STAGE 07: RESPUESTA MENU DE IMAGENES
export const foo_stage07 = async (inputInfo:StageInputParameters) => {
  const {userId,input,caseId} = inputInfo
  const id = +(input || '').split('||')[1]
  const image = await prisma.image.findUnique({where: {id}}) || {url:''}
  if(!image.url){
    await Bot_BadOptionMessage(userId)
    await foo_stage06(inputInfo)
  }

  const {url} = image
  await Bot_SendPhoto(url,userId)
  await foo_stage02(inputInfo)
}


//* STAGE 08: MENU DE BIBLIOGRAFIA
export const foo_stage08 = async (inputInfo:StageInputParameters) => {
  const {userId,caseId} = inputInfo
  const caso = await prisma.case.findUnique({where:{id:caseId},include:{temas:{select:{tema_id:true}}}}) 

  const temas = caso?.temas.map(el => el.tema_id)

  const biblios = await prisma.biblio.findMany({
    where:{
      temas:{
        some:{
          tema_id:{in:temas}
        }
      }
    }
  })

  const libros = biblios.map(el => el.title)

  const text = 'Selecciona el libro del cual deseas consultar'
  await Bot_SendKeyboard(text,userId,libros)
  await updateStage(userId,9)
}

//* STAGE 09: RESPUESTA AL MENU DE BIBLIOGRAFIA
export const foo_stage09 = async (inputInfo:StageInputParameters) => {
  const {userId,input} = inputInfo
  const book = await prisma.biblio.findUnique({where:{title:input}}) || {id:0}
  if(!book || !book.id){
    await Bot_BadOptionMessage(userId)
    await foo_stage08(inputInfo)
  }

  const {id} = book
  await updateUser(userId,['book_id'],[id])
  await foo_stage10(inputInfo)
}

//* STAGE 10: CONSULTA A BIBLIOGRAFIA
export const foo_stage10 = async (inputInfo:StageInputParameters) => {
  const {userId,input} = inputInfo
  const text = `Has una consulta en ${input}`

  await Bot_SendMessage(text,userId)
  await updateStage(userId,11)

}

//* STAGE 11: RESPUESTA A BIBLIOGRAFIA
export const foo_stage11 = async (inputInfo:StageInputParameters) => {
  const {userId,input,bookId} = inputInfo

  const sqlPet = `SELECT vector FROM "Embedding" WHERE biblio_id=${bookId}`
  const vector = await prisma.$queryRawUnsafe(sqlPet) || [{vector:[]}]

  //! logica de rag para la respuesta

  const answer = await ansQuestion(input)
  await Bot_SendMessage(answer,userId)
  await foo_stage02(inputInfo)
}


//* STAGE 12: CONSULTA DE DIAGNOSTICO
export const foo_stage12 = async (inputInfo:StageInputParameters) => {
  const {userId} = inputInfo

  const text = `Cual es el diagnostico que encontraste:`

  await Bot_SendMessage(text,userId) 
  await updateStage(userId,13)
}

//* STAGE 13: RESPUESTA DE DIAGNOSTICO
export const foo_stage13 = async (inputInfo:StageInputParameters) => {
  const {userId,input} = inputInfo

  //! LOGFICA RAG PARA VALIDACION DE RESPUESTA
  const randomBoolean = () => {
    const {round,random} = Math
    const [max,min] = [1,0]
    const newNum = round(random()*(max-min)+min)
    return newNum
  }
  const valueAns = randomBoolean()

  if(valueAns){
    const text = 'Felicidades por participar, tu respuesta es correcta!!!'
    await Bot_SendMessage(text,userId)
    await resetUser(userId)
    await foo_stage_start(inputInfo)
  }else{
    const text = 'Por poco, tu respuesta es diferente a la correcta!!!'
    await Bot_SendMessage(text,userId)
    await foo_stage14(inputInfo)
  } 
}

//* STAGE 14: MENU DE INCORRECTO
const stage14_options = [
  'Seguir intentando',
  'Saber la respuesta'
]
export const foo_stage14 = async (inputInfo:StageInputParameters) => {
  const {userId} = inputInfo
  const text = 'Que deseas hacer?'
  await Bot_SendKeyboard(text,userId,stage14_options)
  await updateStage(userId,15)
}

//* STAGE 15: RESPUESTA A MENU INCORRECTO
export const foo_stage15 = async (inputInfo:StageInputParameters) => {
  const {userId,input,caseId} = inputInfo
  const ans = stage14_options.indexOf(input)
  if(ans == -1){
    await Bot_BadOptionMessage(userId)
    return await foo_stage14(inputInfo)
  }

  if(ans == 0){
    return await foo_stage02(inputInfo)
  }
  if(ans == 1){
    // const caso = await prisma.case.findUnique({where:{id:caseId}})
    
    const answer = 'Este mensaje no puede estar vacio' // caso.ans
    await Bot_SendMessage(answer,userId)
    await resetUser(userId)
    return await foo_stage_start(inputInfo)
  }
}
