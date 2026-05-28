import { badResponse, goodResponse } from '@/helpers/api/response';
import { prisma } from '@/lib/prisma';

//* POST: Subir una bibliografia
//! El vectorizado debe hacerce en el front
//! Debe asegurarse que los ids de los temas esten en la base de datos
interface BodyPostPaper {
  title:string
  autor:string
  chunks:{
    vector:string
    content:string
    index: number
  }[]
  themes: number[]
}

export async function POST(request:Request){
  try{
    const body:BodyPostPaper = await request.json()
    
    const {title,autor,chunks,themes} = body

    const newPaper = await prisma.paper.create({data:{title,autor}})
    
    const paperId = newPaper.id
    const dataEmbeddings = chunks.map( el => ({...el,paperId}))
    await prisma.embedding.createMany({data:dataEmbeddings})

    const dataThemes = themes.map( themeId => ({themeId,paperId}))
    await prisma.themesOnPapers.createMany({data:dataThemes})

    return goodResponse('Opciones subidas correctamente')
  }catch(err){
    return badResponse({err})
  }
}