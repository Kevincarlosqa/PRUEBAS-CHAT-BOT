import { goodResponse } from "@/helpers/api/response"
import { prisma } from "@/helpers/db/prisma"
import { createEmbeddings } from "@/helpers/openAi/createEmbeddings"
import { ragAnswer } from "@/helpers/openAi/rag_answer"
import { stage_13 } from "@/helpers/stages/stage_13"
import { stage_data } from "@/helpers/types/stages"



export async function POST(request:Request) {

  const holi:stage_data = {
    botIndex:1,
    caseId:1,
    errors:0,
    id:1,
    input: 'Cual es el tratamiento para infecciones virales?',
    paperId: 1,
    stage: 13,
    themeId: 1,
    userId: '1573982513',
    userName: 'Cartlos'
  }
  
  await stage_13(holi)
  return goodResponse('todo ok')
}