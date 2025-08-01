


// export const genSQL_Embedding = (data:EmbeddingsRAG[]) => {
//   let ans = 'INSERT INTO "Embedding" ("index","content","vector","paperId") \n VALUES \n'

//   const len = data.length - 1

//   const last = data[len]

//   for (let i = 0; i < len; i++) {
//     const {content,index,paperId,vector} = data[i];

//     const safeContent = content.replace(/'/g,"''")

//     let chunk = `[${vector.join(',')}]`

//     const arrow = `(${index+1},'${safeContent}','${chunk}',${paperId}),\n`

//     ans += arrow
//   }
//   const safe = last.content.replace(/'/g,"''")
//   const vector = `[${last.vector.join(',')}]`

//   ans += `(${len+1},'${safe}','${vector}',${last.paperId});`

//   return ans
// }