import { findUser, TopicKeys } from "./prisma";
import { foo_stage00, foo_stage01, foo_stage02, foo_stage03, foo_stage04, foo_stage05, foo_stage06, foo_stage07, foo_stage08, foo_stage09, foo_stage10, foo_stage12, foo_stage13, foo_stage14, foo_stage15, foo_stage11, foo_stage_msg, foo_stage_start} from '@/helpers/stages3';
import { Bot_SendMessage } from "./message";
import { resUserMessage, StageInputParameters } from "@/types/res";

const chat_chrls1 = 1573982513
const chat_chrls2 = 1568853312
const chat_kevin = 6141714656

export const getBodyInfo = (body:resUserMessage) => {
  const { message } = body
  const { text, chat } = message
  const { id, first_name } = chat

  const userName = first_name
  const userId = id
  const input = text

  return {userName,userId,input}
}

const foo_stages = [
  foo_stage00, foo_stage01, foo_stage02, foo_stage03, foo_stage04, foo_stage05, foo_stage06, foo_stage07, foo_stage08, foo_stage09, foo_stage10, foo_stage11, foo_stage12, foo_stage13, foo_stage14, foo_stage15
]

export const chat_with_bot = async (body:resUserMessage ,botIndex:TopicKeys) => {
  const {input,userId,userName} = getBodyInfo(body)

  const user = await findUser(userId,botIndex)

  if(user){
    const {idStage,idCase,idBook} = user
    const inputInfo:StageInputParameters = {
      userId,
      input,
      bookId:idBook,
      botIndex,
      caseId:idCase,
    }

    await foo_stages[idStage](inputInfo)

  }else{

    await foo_stage_msg({bookId:0,caseId:0,input:userName,userId,botIndex})
  }
  
  return userId
}

export const resErrorAns = async (err:any) => {
  try{
    await Bot_SendMessage(JSON.stringify(err,null,2),chat_chrls1)
  }catch(e){}
}