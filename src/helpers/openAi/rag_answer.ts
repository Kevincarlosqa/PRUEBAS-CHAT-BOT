import { ChatOpenAI } from "@langchain/openai"
import { OpenAi_Embeddings } from "./createEmbeddings"


export const ragAnswer = async (question:string,data:EmbeddingsRAG[]) => {

  const questionVector = await OpenAi_Embeddings.embedQuery(question)
  
  const context = createContext(data,questionVector,10)

  const prompt = `Usa la siguiente contexto y responde como dentista
  Contexto: ${context}
  Pregunta: ${question}
  `
  const llm = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0
  })

  const respuesta = await llm.invoke(prompt)

  return `${respuesta.content}`
}