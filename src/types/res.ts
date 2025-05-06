import { TopicKeys } from "@/helpers/prisma";

// RESPONSE MESSAGE USER => BOT
export interface resUserMessage {
  update_id: number;
  message:   MessageInputText;
}

interface MessageInputText {
  message_id: number;
  from:       From;
  chat:       Chat;
  date:       number;
  text:       string;
}

interface Chat {
  id:         number;
  first_name: string;
  last_name:  string;
  type:       string;
}

interface From {
  id:            number;
  is_bot:        boolean;
  first_name:    string;
  last_name:     string;
  language_code?: string;
}

// RESPONSE MESSAGE BOT => USER
export interface resBotMessage {
  ok:     boolean;
  result: Result;
}

interface Result {
  message_id: number;
  from:       From;
  chat:       Chat;
  date:       number;
  text:       string;
}



// OBJETO MESSAGE BOT => USER
export interface botMessageObject {
  chat_id:      number;
  text:         string;
  reply_markup: ReplyMarkup;
}

interface ReplyMarkup {
  keyboard:          Array<Keyboard[]>;
  resize_keyboard:   boolean;
  one_time_keyboard: boolean;
}

interface Keyboard {
  text: string;
}


// DATA USER
export interface User_DB {
  id: number,
  stage_id: number,
  book_id: number,
  case_id: number
}

export interface TypeBiblio_DB {
  name: string
}

export interface Tema_DB{
  nombre: string
}

export interface StageInputParameters {
  userId: number,
  input: string,
  caseId: number,
  bookId: number,
  botIndex: TopicKeys,
} 