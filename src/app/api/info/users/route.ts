import { badResponse, goodResponse } from "@/helpers/api/response";


export async function GET(request:Request) {
  try{
    return goodResponse('holi')
  }catch(err){
    return badResponse({err})
  }
}