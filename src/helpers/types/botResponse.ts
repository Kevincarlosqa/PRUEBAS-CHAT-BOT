export interface botResponse {
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
  id:         bigint;
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