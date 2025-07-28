import { Bot_sendMsg } from "../api/message";
import { stage_data } from "../types/stages";
import { resetStep } from "./helpers";

export const stage_start = async (inputInfo:stage_data) => {
  const { userId, botIndex, stage, id } = inputInfo
  const text = 'Escribe cualquier cosa para iniciar'

  if(stage != 0)await resetStep(id)
  await Bot_sendMsg(text,userId,botIndex)
}

