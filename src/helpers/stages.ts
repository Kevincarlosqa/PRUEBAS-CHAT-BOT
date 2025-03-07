import { bookList, casesInfo, stageTwoOptions } from "./hardInfo"
import { Bot_BadOptionMessage, Bot_SendKeyboard, Bot_SendMessage } from "./message"
import { createUser, resetUser, updateUser } from "./prisma"

//* STAGE 00: Mensaje de saludo para usuarios nuevos
export const foo_stage00 = async (user_id:number, name:string) => {
  const text = `Bienvenido ${name} al [nombre del chat bot]!!!`
  await createUser(user_id)
  await Bot_SendMessage(text,user_id)
}

//* STAGE 01: Menu para ver casos disponibles
export const foo_stage01 = async (user_id:number) => {
  //? funcion o ruta para obtener la lista de casos
  const listCases = casesInfo.map(el => el.name) 
  const text = 'Selecciona un caso para continuar:'
  await Bot_SendKeyboard(text,user_id,listCases)
  //? Funcion o ruta para cambiar el estado del usuario a 2
  await updateUser(user_id,["stage_id"],[2])
}

//* STAGE 02: Respuesta de casos disponibles
export const foo_stage02 = async (user_id:number,name_case:string) => {
  //? funcion o ruta para obtener el caso de la DB
  const caseInfo = casesInfo.find(el=> el.name === name_case) 
  if(!caseInfo) { // si el caso no existe, vuelve a mostrar el menu
    await Bot_BadOptionMessage(user_id)
    return await foo_stage01(user_id)
  } 

  const {id:case_id,patient,info} = caseInfo
  const text1 = `Paciente\n ${patient} \n\n Descripcion del caso\n ${info}`
  await Bot_SendMessage(text1,user_id)
  //? Funcion o ruta para guardar el id del caso
  //? Funcion o ruta para guardar el estado del usuario a 3
  await updateUser(user_id,["case_id","stage_id"],[case_id,3])
  await foo_stage03(user_id)
}

//* STAGE 03: Menu general del caso
export const foo_stage03 = async (user_id:number) => {
  const text2 = 'Que deseas hacer?'
  await Bot_SendKeyboard(text2,user_id,stageTwoOptions)
  //? Funcion o ruta para cambiar el estado del usuario a 4
  await updateUser(user_id,["stage_id"],[4])
}

//* STAGE 04: Respuesta al menu general
export const foo_stage04 = async (user_id:number, input:string) => {
  const nextStage = stageTwoOptions.indexOf(input)
  if(nextStage === -1) { // Si la opcion no es correcta, vuelve a mostrar el menu general
    await Bot_BadOptionMessage(user_id)
    return await foo_stage03(user_id)
  } 
  

  if(nextStage == 0){ // ruta menu de fotos
    //? Funcion o ruta para cambiar el estado del usuario a 5
    await updateUser(user_id,["stage_id"],[5])
    return await foo_stage05(user_id) 
  }
  if(nextStage == 1){ // ruta menu de libros
    //? Funcion o ruta para cambiar el estado del usuario a 7
    await updateUser(user_id,["stage_id"],[7])
    return await foo_stage07(user_id) 
  }
  if(nextStage == 2){ // ruta consulta de diagnostico
    //? Funcion o ruta para cambiar el estado del usuario a 10
    await updateUser(user_id,["stage_id"],[10])
    return await foo_stage10(user_id)
    
  }
  if(nextStage == 3){ // ruta nuevo caso
    //? Funcion o ruta para eliminar el caso del usuario
    //? Funcion o ruta para cambiar el estado del usuario a 1
    await resetUser(user_id)
    return await foo_stage01(user_id)
  }
}


//* STAGE 05: Menu para seleccionar foto del caso
export const foo_stage05 = async (user_id:number) => {
  const caseInfo = casesInfo[0] //? Funcion o ruta para obtener las fotos del caso del usuario
  const {photos} = caseInfo
  const listPhotos = photos.map(el => el.name)
  const text = 'Selecciona una foto'
  //? Funcion o ruta para cambiar el estado del usuario a 6
  await updateUser(user_id,["stage_id"],[6])
  await Bot_SendKeyboard(text,user_id,listPhotos)
}

//* STAG4E 06: Respuesta para la seleccion de foto
export const foo_stage06 = async (user_id:number, photo_name:string) => {
  const caseInfo = casesInfo[0] //? Funcion o ruta para obtener las fotos del caso del usuario
  const {photos} = caseInfo
  const photoInfo = photos.find(el => el.name === photo_name)
  if(!photoInfo) { // si el nombre de la foto es invvalido vuelve a solicitar la foto
    //? Funcion o ruta para cambiar el estado del usuario a 5
    await updateUser(user_id,["stage_id"],[5])
    await Bot_BadOptionMessage(user_id)
    return await foo_stage05(user_id)
  }
  const {url} = photoInfo
  await Bot_SendMessage(url,user_id) //? Funcion o ruta para enviar la imagen del usuario
  //?Funcion o ruta para cambiar el estado del usuario a 3
  await updateUser(user_id,["stage_id"],[3])
  await foo_stage03(user_id)
}

//* STAG4E 07: Respuesta para la seleccion de libro
export const foo_stage07 = async (user_id:number) => {
  const listBooks = bookList.map(el => el.name) //? Ruta para obtener la lista de libros de la DB
  //?Funcion o ruta para cambiar el estado del usuario a 8
  await updateUser(user_id,["stage_id"],[8])
  const text = 'Selecciona el libro a consultar:'
  await Bot_SendKeyboard(text,user_id,listBooks)
}

//* STAG4E 08: Respuesta para la seleccion de libro
export const foo_stage08 = async (user_id:number,book_name:string) => {
  const bookInfo = bookList.find(el => el.name === book_name)
  if(!bookInfo){ // si el libro es invalido, vuelve a solicitar el libro
    //?Funcion o ruta para cambiar el estado del usuario a 7
    await updateUser(user_id,["stage_id"],[7])
    await Bot_BadOptionMessage(user_id)
    return await foo_stage07(user_id)
  }

  const {id} = bookInfo
  //?Funcion o ruta para guardar el id del libro 
  const text = `Que deseas buscar en ${book_name}?`
  await Bot_SendMessage(text,user_id)
}

//* STAG4E 09: Respuesta para la pregunta del libro
export const foo_stage09 = async (user_id:number, input:string) => {
  const bookInfo = bookList[0] //? Funcion o ruta para obtener la informacion del libro en la base de datos
  const text = `Respuesta a la pregunta ${input}` //! FUNCION O RUTA RESPUESTA DE LA IA

  //? Funcio o ruta para cambiar el estado del usuario a 3
  await updateUser(user_id,["stage_id"],[3])
  await Bot_SendMessage(text,user_id)
  await foo_stage03(user_id)
}

//* STAG4E 10: Pregunta del diagnostico
export const foo_stage10 = async (user_id:number) => {
  const text = 'Cual es el diagnostico?'
  //?Funcino o ruta para cambiar el estado del usuario a 10
  await updateUser(user_id,["stage_id"],[10])
  await Bot_SendMessage(text,user_id)
}

//* STAG4E 11: Pregunta del diagnostico
export const foo_stage11 = async (user_id:number,input:string) => {
  const answerCorrect = true //! FUNCION QUE VERIFICA SI EL DIAGNOSTICO ES CORRECTO CON LA IA
  const text = 'Explicacion de porque la espuesta esta bien o mal' //! TEXTO GENERADO CNO LA IA
    await Bot_SendMessage(text,user_id)

  if(answerCorrect){
    const text1 = 'Felicidades la respuesta fue correcta, vayamos a otro caso :3'
    //? Funcion o ruta para cambiar el estado del usuario a 1
    //?Funcion o ruta para eliminar el caso y el libro del usuario - opcional
    await resetUser(user_id)
    await Bot_SendMessage(text1,user_id)
    await foo_stage01(user_id)
  }else{
    //?Funcio o ruta para cambiar el estado a 3
    await updateUser(user_id,["stage_id"],[3])
    await foo_stage03(user_id)
  }
}