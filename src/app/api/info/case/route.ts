import { badResponse, goodResponse } from '@/helpers/api/response';
import { prisma } from '@/helpers/db/prisma';
import { post_case_body } from '@/helpers/types/api';

/*
  body = {
    case:{title,exam,history,background,work,pain}
    answers:[{answerId,isCorrect},{answerId,isCorrect},]
    themes: [themeId_1,themeId_2,...]
  }
*/

// Agregar un caso
  export async function POST(request:Request) { 
    try{  
      const body:post_case_body = await request.json()
      const {answers, themes, caso} = body

      const {id:caseId} = await prisma.case.create({data:caso})
      const ans = answers.map( el => ({caseId,...el}))
      const ths = themes.map( el => ({caseId,themeId:el}))

      await prisma.answersOnCases.createMany({data:ans})
      await prisma.themesOnCases.createMany({data:ths})

      return goodResponse('Caso agregado correctamente')
    }catch(err){
      return badResponse({err})
    }
  }


// Editar la informacion de un caso
  // export async function PATCH(request:Re)
