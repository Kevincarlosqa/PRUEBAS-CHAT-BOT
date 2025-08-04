import { badResponse, goodResponse } from '@/helpers/api/response';
import { prisma } from '@/helpers/db/prisma';
import { post_case_body } from '@/helpers/types/api';


//* POST:  Agregar un caso

interface BodyPostCase {
  data:{
    title: string
    exam: string
    history: string
    background: string
    work: string
    pain: string
  }
  options: {
    answerId: number
    isCorrect: boolean
  }[]
  themes: number[]
  images:{
    url: string
    title: string
    type: boolean
    info: string
  }[]
}

  export async function POST(request:Request) { 
    try{  
      const body:BodyPostCase = await request.json()

      const {data,options,themes,images} = body

      const {id:caseId} = await prisma.case.create({data})

      const newOptions = options.map( el => ({...el,caseId}))
      await prisma.answersOnCases.createMany({data:newOptions})

      const newThemes = themes.map( themeId => ({themeId,caseId}))
      await prisma.themesOnCases.createMany({data:newThemes})

      const newImages = images.map( el => ({...el,caseId}))
      await prisma.image.createMany({data:newImages})

      return goodResponse('Caso agregado correctamente')
    }catch(err){
      return badResponse({err})
    }
  }
