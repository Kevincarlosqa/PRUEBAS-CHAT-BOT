// import { saveUserInfo, searchUser } from '@/helpers/json_routes';
import { bookList, casesInfo, stageTwoOptions } from '@/helpers/hardInfo';
import { Bot_BadOptionMessage, Bot_SendKeyboard, Bot_SendMessage, genHTTP } from '@/helpers/message';
import { resUserMessage } from '@/helpers/types';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';


// HELPERS
  const getBodyInfo = (body:resUserMessage) => {
    const { message } = body
    const { text, chat } = message
    const { id, first_name } = chat

    return {text,id,first_name}
  }
// En cada peticion al weebhook se consulta sobre
// const foo_stage = async () => {}


//* STAGE 00: Mensaje de saludo para usuarios nuevos
  const foo_stage00 = async (chat_id:number, name:string) => {
    const text = `Bienvenido ${name} al [nombre del chat bot]!!!`
    await Bot_SendMessage(text,chat_id)
    //? funcion o ruta para cambiar el estado del usuario a 1
  }

//* STAGE 01: Menu para ver casos disponibles
  const foo_stage01 = async (chat_id:number) => {
    const listCases = casesInfo.map(el => el.name) //? funcion o ruta para obtener la lista de casos
    const text = 'Selecciona un caso para continuar:'
    await Bot_SendKeyboard(text,chat_id,listCases)
    //? Funcion o ruta para cambiar el estado del usuario a 2
  }
  
//* STAGE 02: Respuesta de casos disponibles
  const foo_stage02 = async (chat_id:number,name_case:string) => {
    const caseInfo = casesInfo.find(el=> el.name === name_case) //? funcion o ruta para obtener el caso de la DB
    if(!caseInfo) { // si el caso no existe, vuelve a mostrar el menu
      await Bot_BadOptionMessage(chat_id)
      return await foo_stage01(chat_id)
    } 

    const {id,patient,info} = caseInfo
    const text1 = `Paciente\n ${patient} \n\n Descripcion del caso\n ${info}`
    await Bot_SendMessage(text1,chat_id)
    //? Funcion o ruta para guardar el id del caso
    //? Funcion o ruta para guardar el estado del usuario a 3
    await foo_stage03(chat_id)
  }

//* STAGE 03: Menu general del caso
  const foo_stage03 = async (chat_id:number) => {
    const text2 = 'Que deseas hacer?'
    //? Funcion o ruta para cambiar el estado del usuario a 4
    await Bot_SendKeyboard(text2,chat_id,stageTwoOptions)
  }

//* STAGE 04: Respuesta al menu general
  const foo_stage04 = async (chat_id:number, input:string) => {
    const nextStage = stageTwoOptions.indexOf(input)
    if(nextStage === -1) { // Si la opcion no es correcta, vuelve a mostrar el menu general
      await Bot_BadOptionMessage(chat_id)
      return await foo_stage03(chat_id)
    } 
    

    if(nextStage == 0){ // ruta menu de fotos
      //? Funcion o ruta para cambiar el estado del usuario a 5
      return await foo_stage05(chat_id) 
    }
    if(nextStage == 1){ // ruta menu de libros
      //? Funcion o ruta para cambiar el estado del usuario a 7
      return await foo_stage07(chat_id) 
    }
    if(nextStage == 2){ // ruta consulta de diagnostico
      //? Funcion o ruta para cambiar el estado del usuario a 10
      return await foo_stage10(chat_id)
      
    }
    if(nextStage == 3){ // ruta nuevo caso
      //? Funcion o ruta para eliminar el caso del usuario
      //? Funcion o ruta para cambiar el estado del usuario a 1
      return await foo_stage01(chat_id)
    }
  }


//* STAGE 05: Menu para seleccionar foto del caso
  const foo_stage05 = async (chat_id:number) => {
    const caseInfo = casesInfo[0] //? Funcion o ruta para obtener las fotos del caso del usuario
    const {photos} = caseInfo
    const listPhotos = photos.map(el => el.name)
    const text = 'Selecciona una foto'
    //? Funcion o ruta para cambiar el estado del usuario a 6
    await Bot_SendKeyboard(text,chat_id,listPhotos)
  }

//* STAG4E 06: Respuesta para la seleccion de foto
  const foo_stage06 = async (chat_id:number, photo_name:string) => {
    const caseInfo = casesInfo[0] //? Funcion o ruta para obtener las fotos del caso del usuario
    const {photos} = caseInfo
    const photoInfo = photos.find(el => el.name === photo_name)
    if(!photoInfo) { // si el nombre de la foto es invvalido vuelve a solicitar la foto
      //? Funcion o ruta para cambiar el estado del usuario a 5
      await Bot_BadOptionMessage(chat_id)
      return await foo_stage05(chat_id)
    }
    const {url} = photoInfo
    await Bot_SendMessage(url,chat_id) //? Funcion o ruta para enviar la imagen del usuario
    //?Funcion o ruta para cambiar el estado del usuario a 3
    await foo_stage03(chat_id)
  }

//* STAG4E 07: Respuesta para la seleccion de libro
  const foo_stage07 = async (chat_id:number) => {
    const listBooks = bookList.map(el => el.name) //? Ruta para obtener la lista de libros de la DB
    //?Funcion o ruta para cambiar el estado del usuario a 8
    const text = 'Selecciona el libro a consultar:'
    await Bot_SendKeyboard(text,chat_id,listBooks)
  }
  
//* STAG4E 08: Respuesta para la seleccion de libro
  const foo_stage08 = async (chat_id:number,book_name:string) => {
    const bookInfo = bookList.find(el => el.name === book_name)
    if(!bookInfo){ // si el libro es invalido, vuelve a solicitar el libro
      //?Funcion o ruta para cambiar el estado del usuario a 7
      await Bot_BadOptionMessage(chat_id)
      return await foo_stage07(chat_id)
    }

    const {id} = bookInfo
    //?Funcion o ruta para guardar el id del libro 
    const text = `Que deseas buscar en ${book_name}?`
    await Bot_SendMessage(text,chat_id)
  }

//* STAG4E 09: Respuesta para la pregunta del libro
  const foo_stage09 = async (chat_id:number, input:string) => {
    const bookInfo = bookList[0] //? Funcion o ruta para obtener la informacion del libro en la base de datos
    const text = `Respuesta a la pregunta ${input}` //! FUNCION O RUTA RESPUESTA DE LA IA

    //? Funcio o ruta para cambiar el estado del usuario a 3
    await Bot_SendMessage(text,chat_id)
    await foo_stage03(chat_id)
  }

//* STAG4E 10: Pregunta del diagnostico
  const foo_stage10 = async (chat_id:number) => {
    const text = 'Cual es el diagnostico?'
    //?Funcino o ruta para cambiar el estado del usuario a 10
    await Bot_SendMessage(text,chat_id)
  }


//* STAG4E 11: Pregunta del diagnostico
const foo_stage11 = async (chat_id:number,input:string) => {
  const answerCorrect = true //! FUNCION QUE VERIFICA SI EL DIAGNOSTICO ES CORRECTO CON LA IA
  const text = 'Explicacion de porque la espuesta esta bien o mal' //! TEXTO GENERADO CNO LA IA
    await Bot_SendMessage(text,chat_id)

  if(answerCorrect){
    const text1 = 'Felicidades la respuesta fue correcta, vayamos a otro caso :3'
    //? Funcion o ruta para cambiar el estado del usuario a 1
    //?Funcion o ruta para eliminar el caso y el libro del usuario - opcional
    await Bot_SendMessage(text1,chat_id)
    await foo_stage01(chat_id)
  }else{
    //?Funcio o ruta para cambiar el estado a 3
    await foo_stage03(chat_id)
  }
}


const foo_stages = [ foo_stage00, foo_stage01, foo_stage02, foo_stage03, foo_stage04, foo_stage05, foo_stage06, foo_stage07, foo_stage08, foo_stage09, foo_stage10, foo_stage11,]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {body} = req
    const {first_name,id,text} = getBodyInfo(body)

    const stage = 0 //? Funcio o ruta para obtener el estado del usuario

    try{
      const data = stage == 0 ? first_name : text
      await foo_stages[stage](id,data)
      return res.status(200).json({message:'todo ok'})

    }catch(err){
      try{
        await Bot_SendMessage(JSON.stringify(err,null,2),1568853312) // si pasa un error que envie nuestro telegram
      }catch(err){
        console.log(err)
      }
    }
    // foo_stages[stage](id,text)
    // // Obtener el id del chat
    // // 
    // // const [text,chat_id] = getResponseValue(body)
    // // const {stage,message_id} = await searchUser(chat_id)

    

    // const chat_id = 1568853312
    // // const text = JSON.stringify(body,null,2)

    // try{
    //   await axios.post(genHTTP('sendMessage'),{ chat_id, text})
    //   return res.status(200).json({message: 'mensaje enviado correctamente'})
    // }catch(err){
    //   return console.log(err)
    // }
}


