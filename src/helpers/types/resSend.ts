// RESPUESTA MENSAJE
  export interface ResBotMessage {
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

  interface Chat {
    id:         number;
    first_name: string;
    last_name:  string;
    type:       string;
  }

  interface From {
    id:         number;
    is_bot:     boolean;
    first_name: string;
    username:   string;
  }


