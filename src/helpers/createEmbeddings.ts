import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai"
import { MemoryVectorStore } from "langchain/vectorstores/memory"



const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200
})
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large"
})


export async function createEmbeddings(file:File){
  const pdfLoader = new WebPDFLoader(file)
  const doc = await pdfLoader.load()
  const allSplits = await splitter.splitDocuments(doc)
  const vectorStore = new MemoryVectorStore(embeddings)
  
  const newSplits = []

  for(let i=0; i<allSplits.length; i++){
    const split = allSplits[i]
    const pageContent = split.pageContent.replace(/(\S)\s*[\r\n]+\s*(\S)/g, '$1 $2').trim()
    split.pageContent = pageContent
    newSplits.push(split)
  }

  await vectorStore.addDocuments(newSplits)

  const memoryVectors = vectorStore.memoryVectors
  const vectors = []
  for(let i=0; i<memoryVectors.length; i++){
    const vector = memoryVectors[i]
    vectors.push(vector.embedding)
  }

  return vectors
}