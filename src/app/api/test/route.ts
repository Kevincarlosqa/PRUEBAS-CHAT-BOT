import { goodResponse } from "@/helpers/api/response"
import { prisma } from "@/helpers/db/prisma"
import { createEmbeddings } from "@/helpers/openAi/createEmbeddings"
import { ragAnswer } from "@/helpers/openAi/rag_answer"



export async function POST(request:Request) {

  // const {url} = await request.json()

  // if(!url) return

  // const embedding = await createEmbeddings(url,1)

  // await prisma.embedding.createMany({data:embedding})

  // const vectors = await prisma.embedding.findMany({where:{paperId:1},select:{id:true,vector:true}})

  const question = 'Cual es el tratamiento para infecciones virales?'

  const ans = await ragAnswer(question,1)

  // await prisma.embedding.deleteMany({where:{id:{gt:893}}})

  return goodResponse('todo ok',{ans})
}