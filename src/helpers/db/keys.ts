export const themeList = [
  {
    key:process.env.TELEGRAM_KEY , 
    link:'t.me/dentis_aqp_bot' , 
    webhook: 'bot_00', 
    name:'GENERAL' 
  },
  {
    key:process.env.TELEGRAM_TEMA_01_KEY , 
    link:'t.me/Tema01DemoDentistBot' , 
    webhook: 'bot_01', 
    name:'Tema 01' 
  },
  {
    key:process.env.TELEGRAM_TEMA_02_KEY , 
    link:'t.me/Tema02DemoDentistBot' , 
    webhook: 'bot_02', 
    name:'Tema 02' 
  },
  {
    key:process.env.TELEGRAM_TEMA_03_KEY , 
    link:'t.me/Tema03DemoDentistBot' , 
    webhook: 'bot_03', 
    name:'Tema 03' 
  },
  {
    key:process.env.TELEGRAM_TEMA_04_KEY , 
    link:'t.me/Tema04DemoDentistBot' , 
    webhook: 'bot_04', 
    name:'Tema 04' 
  },
  {
    key:process.env.TELEGRAM_TEMA_05_KEY , 
    link:'t.me/Tema05DemoDentistBot' , 
    webhook: 'bot_05', 
    name:'Tema 05' 
  },
  {
    key:process.env.TELEGRAM_TEMA_06_KEY , 
    link:'' , 
    webhook: '', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_07_KEY , 
    link:'' , 
    webhook: '', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_08_KEY , 
    link:'' , 
    webhook: '', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_09_KEY , 
    link:'' , 
    webhook: '', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_10_KEY , 
    link:'' , 
    webhook: '', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_11_KEY , 
    link:'' , 
    webhook: '', 
    name:'' },
  {
    key:process.env.TELEGRAM_TEMA_12_KEY , 
    link:'' , 
    webhook: '', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_13_KEY , 
    link:'' , 
    webhook: '', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_14_KEY , 
    link:'' , 
    webhook: '', 
    name:'' 
  },
  {
    key:process.env.TELEGRAM_TEMA_15_KEY , 
    link:'' , 
    webhook: '', 
    name:'' 
  }
] as const;

export type KeysTopics = (typeof themeList)[number]




