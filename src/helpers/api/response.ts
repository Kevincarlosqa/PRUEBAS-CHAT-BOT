import { NextResponse } from "next/server"



export const goodResponse = (message:string,data?:Object) => {
  return NextResponse.json({message,data},{status:200})
}

export const badResponse = (err:Object) => {
  return NextResponse.json(err,{status:400})
}

export const errorResponse = (message:string,err?:Object) => {
  console.error(err)
  throw new Error(JSON.stringify({message,...err},null,2)) 
}



export const consoleError = (err: any) => {
  const stack = new Error().stack;

  const stackLines = stack?.split("\n") as string[];
  const callerLine = stackLines[2] || "";

  const match = callerLine.match(/at\s+(async\s+)?([^\s(]+)/);
  const functionName = match ? match[2] : "Origen desconocido";

  console.error(`\x1b[31m[ERROR EN: ${functionName}]\x1b[0m`);
  console.error("!______________start-error_________________!");
  console.error(err);
  console.error("!_______________end-error_________________!");
};