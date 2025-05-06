import { userInfo } from "os"
import { Bot_BadOptionMessage, Bot_SendKeyboard, Bot_SendMessage, Bot_SendPhoto } from "./message"
import { createUser, prisma, resetUser, updateUser } from "./prisma"
import { ansQuestion } from "./openAI"
import { StageInputParameters } from "./types"



//* MENSAJE DE BIENVENIDA PARA LOS NUEVOS USUARIOS
export const foo_stage_msg = async (inputInfo:StageInputParameters) => {
  const {input,userId,botIndex} = inputInfo
  const text = `¡Bienvenido ${input}! 
      Nos alegra tenerte aquí. Este espacio ha sido diseñado especialmente para que puedas aprender, explorar y fortalecer tus conocimientos en odontología a través del análisis de casos clínicos reales.
      Aquí no solo encontrarás información, sino también herramientas para reflexionar, cuestionar y aplicar lo aprendido en situaciones concretas. Queremos acompañarte en cada paso de tu proceso formativo, brindándote contenidos claros, prácticos y actualizados.
      Prepárate para observar, pensar y decidir como un profesional. ¡Comencemos!`
  
  await Bot_SendMessage(text,userId,botIndex)
  await createUser(userId,botIndex)
  await foo_stage_start(inputInfo)
}

//* ESTADO DE INICIO PARA EMPEZAR CON LOS CASOS
export const foo_stage_start = async (inputInfo:StageInputParameters) => {
  const {userId,botIndex} = inputInfo
  const text = 'Escribe cualquier mensaje para iniciar'
  await Bot_SendMessage(text,userId,botIndex)
  await updateUser(userId,botIndex,0)
}

//* STAGE 00: ENVIO DE CASOS DISPONIBLES EN LA DB
export const foo_stage00 = async (inputInfo:StageInputParameters) => {
  const {userId,botIndex} = inputInfo
  const list = await prisma.dentalCase.findMany({
    select:{
      title:true
    }
  })

  const text = 'Selecciona el caso que desees resolver'
  const list_cases = list.map(el => el.title)
  
  await Bot_SendKeyboard(text,userId,list_cases,botIndex)
  await updateUser(userId,botIndex,1)
}

//* STAGE 01: RESPUESTA PARA CASOS DISPONIBLES
export const foo_stage01 = async (inputInfo:StageInputParameters) => {
  const {userId,input:title_case,botIndex} = inputInfo
  const caso = await prisma.dentalCase.findFirst({where:{title:title_case,topics:{some:{topic:{id:botIndex}}}}})
  if(!caso) {
    await Bot_BadOptionMessage(userId,botIndex)
    return foo_stage00(inputInfo)
  }

  const {id:case_id,exam} = caso
  await Bot_SendMessage(exam,userId,botIndex)
  await updateUser(userId,botIndex,null,null,case_id) //updateUser(userId,['case_id'],[case_id])
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
  const {userId,botIndex} = inputInfo
  const text = 'Por favor selecciona una opcion'
  await Bot_SendKeyboard(text,userId,stage02_options,botIndex)
  await updateUser(userId,botIndex,3)//updateStage(userId,3)
}

//* STAGE 03: RESPUESTA AL MENU GENERAL DEL CASO
export const foo_stage03 = async (inputInfo:StageInputParameters) => {
  const {userId,input,botIndex} = inputInfo
  const nextStage = stage02_options.indexOf(input || '')
  if(nextStage === -1){
    await Bot_BadOptionMessage(userId,botIndex)
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
  const {userId,botIndex} = inputInfo
  const text = 'Por favor selecciona una opcion'
  await Bot_SendKeyboard(text,userId,stage04_options,botIndex)
  await updateUser(userId,botIndex,5)//updateU(userId,5)
}

//* STAGE 05: RESPUESTA AL MENU DE MAS INFORMACION
export const foo_stage05 = async (inputInfo:StageInputParameters) => {
  const {userId,input,caseId,botIndex} = inputInfo
  const nextStage = stage04_options.indexOf(input || '')
  if(nextStage === -1){
    await Bot_BadOptionMessage(userId,botIndex)
    return await foo_stage04(inputInfo)
  }
  
  if(nextStage == 0){ // ENVIO DE antecedentes
    const {ante} = await prisma.dentalCase.findUnique({where: {id:caseId}}) || {ante:''}
    await Bot_SendMessage(ante,userId,botIndex)
    return await foo_stage02(inputInfo)
  }
  if(nextStage == 1){ // MENU fotografia
    return await foo_stage06(inputInfo)
  }
}

//* STAGE 06: MENU DE IMAGENES
export const foo_stage06 = async (inputInfo:StageInputParameters) => {
  const {userId,caseId,botIndex} = inputInfo
  const images = await prisma.image.findMany({where: {idCase:caseId}})
  const text = 'Selecciona una imagen: '
  const listImages = images.map( el => {
    const {id,name,type} = el
    const base = type == 1 ? 'Radiografia' : 'Fotografia'
    return `${base} ${name} || ${id}`
  })

  await Bot_SendKeyboard(text,userId,listImages,botIndex)
  await updateUser(userId,botIndex,7)//updateStage(userId,7)
}

//* STAGE 07: RESPUESTA MENU DE IMAGENES
export const foo_stage07 = async (inputInfo:StageInputParameters) => {
  const {userId,input,caseId,botIndex} = inputInfo
  const id = +(input || '').split('||')[1]
  const image = await prisma.image.findUnique({where: {id}}) || {url:''}
  if(!image.url){
    await Bot_BadOptionMessage(userId,botIndex)
    await foo_stage06(inputInfo)
  }

  const {url} = image
  await Bot_SendPhoto(url,userId,botIndex)
  await foo_stage02(inputInfo)
}


//* STAGE 08: MENU DE BIBLIOGRAFIA
export const foo_stage08 = async (inputInfo:StageInputParameters) => {
  const {userId,caseId,botIndex} = inputInfo
  const caso = await prisma.dentalCase.findUnique({where:{id:caseId},include:{topics:{select:{idTopic:true}}}}) 

  const temas = caso?.topics.map(el => el.idTopic)

  const biblios = await prisma.info.findMany({
    where:{
      topics:{
        some:{
          idTopic:{in:temas}
        }
      }
    }
  })

  const libros = biblios.map(el => el.title)

  const text = 'Selecciona el libro del cual deseas consultar'
  await Bot_SendKeyboard(text,userId,libros,botIndex)
  await updateUser(userId,botIndex,9) //updateStage(userId,9)
}

//* STAGE 09: RESPUESTA AL MENU DE BIBLIOGRAFIA
export const foo_stage09 = async (inputInfo:StageInputParameters) => {
  const {userId,input,botIndex} = inputInfo
  const book = await prisma.info.findUnique({where:{title:input}}) || {id:0}
  if(!book || !book.id){
    await Bot_BadOptionMessage(userId,botIndex)
    await foo_stage08(inputInfo)
  }

  const {id} = book
  await updateUser(userId,botIndex,null,id) //updateUser(userId,['book_id'],[id])
  await foo_stage10(inputInfo)
}

//* STAGE 10: CONSULTA A BIBLIOGRAFIA
export const foo_stage10 = async (inputInfo:StageInputParameters) => {
  const {userId,input,botIndex} = inputInfo
  const text = `Has una consulta en ${input}`

  await Bot_SendMessage(text,userId,botIndex)
  await updateUser(userId,botIndex,11) //updateStage(userId,11)

}

//* STAGE 11: RESPUESTA A BIBLIOGRAFIA
export const foo_stage11 = async (inputInfo:StageInputParameters) => {
  const {userId,input,bookId,botIndex} = inputInfo

  const sqlPet = `SELECT vector FROM "Embedding" WHERE biblio_id=${bookId}`
  const vector = await prisma.$queryRawUnsafe(sqlPet) || [{vector:[]}]

  //! logica de rag para la respuesta

  const answer = await ansQuestion(input)
  await Bot_SendMessage(answer,userId,botIndex)
  await foo_stage02(inputInfo)
}


//* STAGE 12: CONSULTA DE DIAGNOSTICO
export const foo_stage12 = async (inputInfo:StageInputParameters) => {
  const {userId,botIndex} = inputInfo

  const text = `Cual es el diagnostico que encontraste:`

  await Bot_SendMessage(text,userId,botIndex) 
  await updateUser(userId,botIndex,13) //updateStage(userId,13)
}

//* STAGE 13: RESPUESTA DE DIAGNOSTICO
export const foo_stage13 = async (inputInfo:StageInputParameters) => {
  const {userId,input,botIndex} = inputInfo

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
    await Bot_SendMessage(text,userId,botIndex)
    await resetUser(userId,botIndex)
    await foo_stage_start(inputInfo)
  }else{
    const text = 'Por poco, tu respuesta es diferente a la correcta!!!'
    await Bot_SendMessage(text,userId,botIndex)
    await foo_stage14(inputInfo)
  } 
}

//* STAGE 14: MENU DE INCORRECTO
const stage14_options = [
  'Seguir intentando',
  'Saber la respuesta'
]
export const foo_stage14 = async (inputInfo:StageInputParameters) => {
  const {userId,botIndex} = inputInfo
  const text = 'Que deseas hacer?'
  await Bot_SendKeyboard(text,userId,stage14_options,botIndex)
  await updateUser(userId,botIndex,15) //updateStage(userId,15)
}

//* STAGE 15: RESPUESTA A MENU INCORRECTO
export const foo_stage15 = async (inputInfo:StageInputParameters) => {
  const {userId,input,caseId,botIndex} = inputInfo
  const ans = stage14_options.indexOf(input)
  if(ans == -1){
    await Bot_BadOptionMessage(userId,botIndex)
    return await foo_stage14(inputInfo)
  }

  if(ans == 0){
    return await foo_stage02(inputInfo)
  }
  if(ans == 1){
    // const caso = await prisma.case.findUnique({where:{id:caseId}})
    
    const answer = 'Este mensaje no puede estar vacio' // caso.ans
    await Bot_SendMessage(answer,userId,botIndex)
    await resetUser(userId,botIndex)
    return await foo_stage_start(inputInfo)
  }
}
