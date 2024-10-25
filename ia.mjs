import { OpenAIEmbeddings } from "@langchain/openai";
import { readPdfText } from "pdf-text-reader";
import pkg from './index.js';



const { store, getData } = pkg;

const embeddings = new OpenAIEmbeddings({
    apiKey: "empty",
    batchSize: 512, // Default value if omitted is 512. Max is 2048
    model: "LLaMA_CPP",
    configuration: {
        baseURL: "http://127.0.0.1:8081/v1",
    }
});

async function fetchData() {
  try {
      const data = await getData();
      return data;
  } catch (error) {
      console.error('Error while fetching data:', error);
      return undefined;
  }
}

const data = await fetchData()
var a = undefined

data.forEach(item => {
  a =item.vector;
});

const decodedVectors = await embeddings.decodeDocuments(a);

console.log(decodedVectors);



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




// const textvector = await embeddings.embedDocuments([resultPdf]);

// await store(textvector)
// console.log(`Resultado del textVector:\n ${textvector[0]}\n`);
// console.log(`length: ${textvector[0].length}`);