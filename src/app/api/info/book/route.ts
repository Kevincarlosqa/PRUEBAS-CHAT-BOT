import { badResponse, goodResponse } from '@/helpers/api/response';
import { prisma } from '@/helpers/db/prisma';
import { post_case_body } from '@/helpers/types/api';
import { intPapers } from '@/helpers/types/models';

/*
  body = {
    case:{title,exam,history,background,work,pain}
    answers:[{answerId,isCorrect},{answerId,isCorrect},]
    themes: [themeId_1,themeId_2,...]
  }

*/

// Agregar un libro
  export async function POST(request:Request) { 
    try{  
      const body:post_case_body = await request.json()
      // const case = body.case
        
      return goodResponse('todo oki',body)
    }catch(err){
      return badResponse({err})
    }
  }

// Editar los valores de un libro
  export async function PUT(request:Request){
    try{
      const body:intPapers = await request.json()
      const {autor,id,title} = body

      await prisma.paper.update({where:{id},data:{autor,title}})

      return goodResponse('Libro actualizado correctamente')
    }catch(err){
      return badResponse({err})
    }
  }