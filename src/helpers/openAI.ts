import OpenAI from "openai";

export const ansQuestion = async (input:string) => {
  const client = new OpenAI();
  
  const response = await client.responses.create({
    model: "gpt-3.5-turbo",
    instructions: "Habla como un dentista pero no menciones que eres dentista",
    input
  });

  return response.output_text
}