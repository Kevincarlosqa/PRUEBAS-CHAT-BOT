// ENVIAR INFORMACION AL CHAT

// INLINE KEYBOARD
  export interface ResponseInfo {
    chat_id:      number;
    text:         string;
    reply_markup?: ReplyMarkup;
  }

  interface ReplyMarkup {
    inline_keyboard: Array<InlineKeyboard[]>;
  }

  interface InlineKeyboard {
    text:          string;
    callback_data: string;
  }

