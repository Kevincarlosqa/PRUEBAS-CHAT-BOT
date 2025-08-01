import { goodResponse } from "@/helpers/api/response"
import { prisma } from "@/helpers/db/prisma"
import { createEmbeddings } from "@/helpers/openAi/createEmbeddings"



export async function POST(request:Request) {

  const {url} = await request.json()

  if(!url) return

  const embedding = await createEmbeddings(url,1)

  await prisma.embedding.createMany({data:embedding})

  return goodResponse('todo ok')
}