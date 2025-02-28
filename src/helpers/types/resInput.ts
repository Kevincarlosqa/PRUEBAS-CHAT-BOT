//  INPUT SIMPLE MESSAGE
  export interface ResChatText {
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
    language_code: string;
  }




// INPUT OPTION   
  export interface ResChatInlineKeyboard {
    update_id:      number;
    callback_query: CallbackQuery;
  }

  interface CallbackQuery {
    id:            string;
    from:          CallbackQueryFrom;
    message:       MessageInputInlineKeyboard;
    chat_instance: string;
    data:          string;
  }

  interface CallbackQueryFrom {
    id:            number;
    is_bot:        boolean;
    first_name:    string;
    last_name:     string;
    language_code: string;
  }

  interface MessageInputInlineKeyboard {
    message_id:   number;
    from:         MessageFrom;
    chat:         Chat;
    date:         number;
    text:         string;
    reply_markup: ReplyMarkup;
  }

  interface MessageFrom {
    id:         number;
    is_bot:     boolean;
    first_name: string;
    username:   string;
  }

  interface ReplyMarkup {
    inline_keyboard: Array<InlineKeyboard[]>;
  }

  interface InlineKeyboard {
    text:          string;
    callback_data: string;
  }
