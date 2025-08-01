import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { OpenAIEmbeddings } from "@langchain/openai"
import { MemoryVectorStore } from "langchain/vectorstores/memory"


export const OpenAi_Embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-large',
})


export const createEmbeddings = async (pdfRoute:string,paperId:number) => {
  const loader = new PDFLoader(pdfRoute)
  const file = await loader.load()

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const allSplits = await splitter.splitDocuments(file)

  const newSplits = []

  for (let i = 0; i < allSplits.length; i++) {
    const split = allSplits[i];
    const content = split.pageContent.replace(/(\S)\s*[\r\n]+\s*(\S)/g, '$1 $2').trim()
    split.pageContent = content
    newSplits.push(split)
  }

  const vectorStore = new MemoryVectorStore(OpenAi_Embeddings)

  await vectorStore.addDocuments(newSplits)

  const memoryVectors = vectorStore.memoryVectors

  const ans = []

  for (let i = 0; i < memoryVectors.length; i++) {
    const vector = memoryVectors[i];
    const val = {
      index: i,
      content: vector.content,
      vector: JSON.stringify(vector.embedding),
      paperId
    }
    ans.push(val)
  }

  return ans
}



// export async function createEmbeddings(pdfPath:string,paperId:number){
//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 1000,
//     chunkOverlap: 100
//   })

//   const pdfLoader = new PDFLoader(pdfPath)
//   const doc = await pdfLoader.load()

//   const allSplits = await splitter.splitDocuments(doc)
//   console.log(allSplits)
//   const newSplits = []

//   for(let i=0; i<allSplits.length; i++){
//     const split = allSplits[i]
//     const pageContent = split.pageContent.replace(/(\S)\s*[\r\n]+\s*(\S)/g, '$1 $2').trim()
//     split.pageContent = pageContent
//     newSplits.push(split)
//   }

//   const embeddings = new OpenAIEmbeddings({
//     model: "text-embedding-3-large"
//   })
//   const vectorStore = new MemoryVectorStore(embeddings)

//   await vectorStore.addDocuments(newSplits)

//   const memoryVectors = vectorStore.memoryVectors
//   const vectors = []
//   for(let i=0; i<memoryVectors.length; i++){
//     const valVector = memoryVectors[i]
//     const vector = valVector.embedding
//     vectors.push({index:i,vector,paperId})
//   }

//   return vectors
// }