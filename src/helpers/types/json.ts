// TIPADO DE LA BASE DE DATOS SIMULADOA : JSON

export interface Json_help {
  [key:number] : UserData
}

export interface UserData {
  stage: number,
  message_id: number
}