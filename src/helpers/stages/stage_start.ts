import { Bot_sendMsg } from "../api/message";
import { errorResponse } from "../api/response";
import { stage_data } from "../types/stages";
import { resetStep } from "./helpers";

export const stage_start = async (inputInfo: stage_data) => {
  const { userId, botIndex, stage, id } = inputInfo;
  const text =
    "Escribe cualquier mensaje para iniciar el análisis clínico y seleccionar tu caso.";

  try {
    if (stage != 0) await resetStep(id);
    await Bot_sendMsg(text, userId, botIndex);
  } catch {
    errorResponse(`Error en el mensaje start`, inputInfo);
  }
};
