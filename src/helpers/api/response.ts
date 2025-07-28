import { NextResponse } from "next/server"

export const goodResponse = (message:string,data?:Object) => NextResponse.json({message,data},{status:200})

export const badResponse = (err:Object) => NextResponse.json(err,{status:400})