import { OpenAIEmbeddings } from "@langchain/openai";
import { readPdfText } from "pdf-text-reader";
import pkg from './index.js';



const { store } = pkg;
const embeddings = new OpenAIEmbeddings({
    apiKey: "empty",
    model: "text-embedding-3-large"
  });
  
  const vectors = await embeddings.embedDocuments(["some text"]);
  console.log(vectors[0].length);
  
// model: "llava-v1.5-7b-q4",
// const resultPdf = await readPdfText({url: "./games.pdf"})
// const resultPdf = "hola buenos dias"

// const a = await embeddings.embedDocuments([resultPdf])

// const prueba = {
//     text: resultPdf,
//     vector: a
// }
// console.log(prueba);



// store([prueba])
//   .then(() => {
//     console.log('Data stored successfully!');
//   })
//   .catch((error) => {
//     console.error('Error while storing data:', error);
//   });