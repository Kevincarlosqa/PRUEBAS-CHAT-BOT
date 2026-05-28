export const themeList = [
  {
    key:process.env.TELEGRAM_KEY , 
    link:'t.me/general_chat_rag_bot' , 
    webhook: 'bot_00', 
    name:'GENERAL' 
  },
  {
    key:process.env.TELEGRAM_TEMA_01_KEY , 
    link:'t.me/chat_rag_1_bot' , 
    webhook: 'bot_01', 
    name:'Tema 01 Demo' 
  },
  {
    key:process.env.TELEGRAM_TEMA_02_KEY , 
    link:'t.me/chat_rag_2_bot' , 
    webhook: 'bot_02', 
    name:'Tema 02 Demo' 
  },
  {
    key:process.env.TELEGRAM_TEMA_03_KEY , 
    link:'' , 
    webhook: 'bot_03', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_04_KEY , 
    link:'' , 
    webhook: 'bot_04', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_05_KEY , 
    link:'' , 
    webhook: 'bot_05', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_06_KEY , 
    link:'' , 
    webhook: 'bot_06', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_07_KEY , 
    link:'' , 
    webhook: 'bot_07', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_08_KEY , 
    link:'' , 
    webhook: 'bot_08', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_09_KEY , 
    link:'' , 
    webhook: 'bot_09', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_10_KEY , 
    link:'' , 
    webhook: 'bot_10', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_11_KEY , 
    link:'' , 
    webhook: 'bot_11', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_12_KEY , 
    link:'' , 
    webhook: 'bot_12', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_13_KEY , 
    link:'' , 
    webhook: 'bot_13', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_14_KEY , 
    link:'' , 
    webhook: 'bot_14', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_15_KEY , 
    link:'' , 
    webhook: 'bot_15', 
    name:'' 
  }
] as const;

export type KeysTopics = (typeof themeList)[number]




