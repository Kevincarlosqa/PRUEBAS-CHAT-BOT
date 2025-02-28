import { readFileSync, writeFileSync } from 'fs'
import { Json_help, UserData } from './types/json'

const routeDb = './src/helpers/db.json'

export const readJson = async () => await JSON.parse(readFileSync(routeDb,'utf8'))
const saveJson = async (data:Json_help) => await writeFileSync(routeDb,JSON.stringify(data,null,2),'utf-8')

// BUSCAR USUARIO
  export const searchUser = async (id:number) => {
    const data = await readJson()
    const user = data[id]
    return user
  }

// CREATE USER
  export const createUser = async (id:number) => {
    const data = await readJson()
    const user = data[id]
    if(user) return

    const userInfo:UserData = {message_id:0,stage:-1}
    const newData = {...data, [id]:userInfo}
    await saveJson(newData)
  }

  export const saveUserInfo = async (id:number,stage?:number,message_id?:number) => {
    const data = await readJson()
    const user:UserData = data[id]
    user.stage = stage || user.stage
    user.message_id = message_id || user.message_id

    const newData = {...data,[id]:user}
    await saveJson(newData)
  }
