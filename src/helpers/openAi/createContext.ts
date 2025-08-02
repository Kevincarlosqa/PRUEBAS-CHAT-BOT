import { Embeddings } from "openai/resources/embeddings.mjs";
import { prisma } from "../db/prisma";

export interface EmbeddingsRAG {
  id?: number;
  index: number;
  content: string;
  vector: string;
  paperId: number;
}

const dotMult = (arrayA:number[], arrayB:number[]):number => {
  let sum = 0
  for (let i = 0; i < arrayA.length; i++) {
    const elA = arrayA[i];
    const elB = arrayB[i];
    sum += (elA * elB)
  }
  return sum
}

const normal = (arr:number[]) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    sum += el**2
  }
  return sum
}

const similitudCoseno = (splitVector:number[],questionVector:number[]):number => {
  const dotVal = dotMult(splitVector,questionVector)
  const normalSplit = normal(splitVector)
  const normalQuest = normal(questionVector)

  return dotVal / (normalSplit * normalQuest)
}


interface separateEmbedding {
  id: number,
  content: string,
}

const size = 10

const genIdsContent = async (paperId:number,questionVector:number[]) => {
  const vectors = await prisma.embedding.findMany({
    where:{paperId},
    select:{id:true,vector:true}
  })

  if(!vectors) return

  const simil = []
  for (let i = 0; i < vectors.length; i++) {
    const el= vectors[i];
    const vector:number[] = JSON.parse(el.vector)
    const score = similitudCoseno(vector,questionVector)
    simil.push([el.id,score])
  }

  simil.sort((a,b) => b[1]-a[1])
  
  return simil.slice(size).map(el => el[0])
}

export const createContext1 = async (paperId:number,questionVector:number[]) => {
  const idsContent = await genIdsContent(paperId,questionVector)
  
  if(!idsContent) return

  const vals = await prisma.embedding.findMany({
    where:{id:{in:idsContent}},
    select:{content:true}
  })

  return vals.join('\n')
}

export const createContext = (embeddings:EmbeddingsRAG[],questionVector:number[],size:number) => {
  const len = embeddings.length
  if(size>=len) throw new Error('El size del context no puede ser mayor que la data')

  const simil = []
  for (let i = 0; i < len; i++) {
    const element = embeddings[i];
    const vector:number[] = JSON.parse(element.vector)
    const score = similitudCoseno(vector,questionVector)
    simil.push({score,...element})
  }

  simil.sort((a,b) => b.score - a.score)

  let context = ''
  for (let i = 0; i < size; i++) {
    const element = simil[i];
    context += `\n${element}`
  }

  return context

  // retornar ids

}



