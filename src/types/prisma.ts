export interface DB_Info {
  id: number,
  title: string,
  autor: string,
  embeddings: number[],
  topics: number[]
}

export interface DB_Embedding{
  id: number,
  idInfo: number,
  vector: number[]
}

export interface DB_Topic{
  id: number,
  name: string,
}

export interface DB_Case{
  id: number,
  title: string,
  ante: string,
  exam: string,
  ans: string,
}

export interface DB_Image{
  id: number,
  name: string,
  type: number,
  url: string,
  idCase: number,
}

export interface DB_User_Topic {
  id: number,
  idStage: number,
  idBook: number,
  idCase: number,
}
