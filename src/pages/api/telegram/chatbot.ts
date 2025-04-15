// import { saveUserInfo, searchUser } from '@/helpers/json_routes';
import { bookList, casesInfo, stageTwoOptions } from '@/helpers/hardInfo';
import { Bot_BadOptionMessage, Bot_SendKeyboard, Bot_SendMessage, genHTTP } from '@/helpers/message';
import { createUser, findUser, prisma } from '@/helpers/prisma';
import { foo_stage00, foo_stage01, foo_stage02, foo_stage03, foo_stage04, foo_stage05, foo_stage06, foo_stage07, foo_stage08, foo_stage09, foo_stage10, foo_stage12, foo_stage13, foo_stage14, foo_stage15, foo_stage11, foo_stage_msg, foo_stage_start} from '@/helpers/stages2';
// import { foo_stage00, foo_stage01, foo_stage02, foo_stage03, foo_stage04, foo_stage05, foo_stage06, foo_stage07, foo_stage08, foo_stage09, foo_stage10, foo_stage11 } from '@/helpers/stages';
import { resUserMessage } from '@/helpers/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface StageInputParameters {
  userId: number,
  input: string,
  caseId: number,
  bookId: number,
} 


// HELPERS
  const getBodyInfo = (body:resUserMessage) => {
    const { message } = body
    const { text, chat } = message
    const { id, first_name } = chat

    return {text,id,first_name}
  }

  
// const foo_stages = [ 
//   foo_stage00, foo_stage01, foo_stage02, foo_stage03, foo_stage04, foo_stage05, foo_stage06, foo_stage07, foo_stage08, foo_stage09, foo_stage10, foo_stage11]

const foo_stages1 = [
  foo_stage00, foo_stage01, foo_stage02, foo_stage03, foo_stage04, foo_stage05, foo_stage06, foo_stage07, foo_stage08, foo_stage09, foo_stage10, foo_stage11, foo_stage12, foo_stage13, foo_stage14, foo_stage15
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {body} = req
  const {first_name,id,text} = getBodyInfo(body)

  try{
    const user = await findUser(id)

    

    if(user){
      const {stage_id,case_id,book_id} = user
      const inputInfo:StageInputParameters = {
        userId: id,
        input: text,
        caseId: case_id,
        bookId:book_id,
      }

      await foo_stages1[stage_id](inputInfo)
    }else{
      // await foo_stage00(id,first_name)
      await foo_stage_msg({bookId:0,caseId:0,input:first_name,userId:id})
    }

    // await createUser(10)

    return res.status(200).json({message: `interaccion del user ${id}`})

  }catch(err){
    try{
      await Bot_SendMessage(JSON.stringify(err,null,2),1573982513)
      return res.status(200).json(err)
    }catch(err){
      return res.status(400).json(err)
    }
  }
}