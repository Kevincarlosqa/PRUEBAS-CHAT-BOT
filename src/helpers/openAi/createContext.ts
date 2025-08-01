
interface EmbeddingsRAG {
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


const createContext = (embeddings:EmbeddingsRAG[],questionVector:number[],size:number) => {
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
}
