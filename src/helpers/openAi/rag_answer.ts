import { ChatOpenAI } from "@langchain/openai"
import { OpenAi_Embeddings } from "./createEmbeddings"
import { createContext, createContext1, EmbeddingsRAG } from "./createContext"


export const ragAnswer = async (question:string,paperId:number) => {

  // const questionVector = await OpenAi_Embeddings.embedQuery(question)
  
  // const context1 = createContext1(paperId,questionVector)

  // Contexto: ${context1}
  // const prompt = `Usa el siguiente contexto y responde para estudiantes dentistas
  const prompt = `responde la pregunta para estudiantes dentistas
   ${question}
  `

  return prompt
  const llm = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0
  })

  const respuesta = await llm.invoke(prompt)

  return `${respuesta.content}`
}