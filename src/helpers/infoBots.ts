


export const topicsList = [
  {
    key:process.env.TELEGRAM_KEY , 
    link:'t.me/dentis_aqp_bot' , 
    webhook: 'chatbot', 
    name:'GENERAL' 
  },
  {
    key:process.env.TELEGRAM_TEMA_01_KEY , 
    link:'t.me/Tema01DemoDentistBot' , 
    webhook: 'chatTema01', 
    name:'Tema 01' 
  },
  {
    key:process.env.TELEGRAM_TEMA_02_KEY , 
    link:'t.me/Tema02DemoDentistBot' , 
    webhook: 'chatTema02', 
    name:'Tema 02' 
  },
  {
    key:process.env.TELEGRAM_TEMA_03_KEY , 
    link:'t.me/Tema03DemoDentistBot' , 
    webhook: 'chatTema03', 
    name:'Tema 03' 
  },
  {
    key:process.env.TELEGRAM_TEMA_04_KEY , 
    link:'t.me/Tema04DemoDentistBot' , 
    webhook: 'chatTema04', 
    name:'Tema 04' 
  },
  {
    key:process.env.TELEGRAM_TEMA_05_KEY , 
    link:'t.me/Tema05DemoDentistBot' , 
    webhook: 'chatTema05', 
    name:'Tema 05' 
  },
  {
    key:process.env.TELEGRAM_TEMA_06_KEY , 
    link:'' , 
    webhook: 'chatTema06', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_07_KEY , 
    link:'' , 
    webhook: 'chatTema07', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_08_KEY , 
    link:'' , 
    webhook: 'chatTema08', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_09_KEY , 
    link:'' , 
    webhook: 'chatTema09', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_10_KEY , 
    link:'' , 
    webhook: 'chatTema10', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_11_KEY , 
    link:'' , 
    webhook: 'chatTema11', 
    name:'' },
  {
    key:process.env.TELEGRAM_TEMA_12_KEY , 
    link:'' , 
    webhook: 'chatTema12', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_13_KEY , 
    link:'' , 
    webhook: 'chatTema13', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_14_KEY , 
    link:'' , 
    webhook: 'chatTema14', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_15_KEY , 
    link:'' , 
    webhook: 'chatTema15', 
    name:'' 
  }
] as const;

export type KeysTopics = (typeof topicsList)[number]




