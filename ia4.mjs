import { OpenAIEmbeddings } from "@langchain/openai";
import { readPdfText } from "pdf-text-reader";
import pkg from './index.js';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";



const { store, getData } = pkg;

const embeddings = new OpenAIEmbeddings({
    apiKey: "empty",
    batchSize: 512, // Default value if omitted is 512. Max is 2048
    model: "LLaMA_CPP",
    configuration: {
        baseURL: "http://127.0.0.1:8081/v1",
    }
});


const resultPdf = await readPdfText({ url: "./games.pdf" })


const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,
    chunkOverlap: 120,
});

const output = await splitter.createDocuments([resultPdf]);
const a = []

output.forEach(item => {
    a.push(item.pageContent)
})

const document = { 
    origin: resultPdf,
    embeddings: []
}


await processItems(a)



async function processItems(a) {
    for (let index = 0; index < a.length; index++) {
        const vectors = await embeddings.embedDocuments([a[index]]);
        document.embeddings.push({
            text: a[index],
            vectors: vectors
        });
    }
}

await store(document)





// console.log(await embeddings.embedDocuments(a));


// store([prueba])
//   .then(() => {
//     console.log('Data stored successfully!');
//   })
//   .catch((error) => {
//     console.error('Error while storing data:', error);
//   });





// async function fetchData() {
//   try {
//       const data = await getData();
//       return data;
//   } catch (error) {
//       console.error('Error while fetching data:', error);
//       return undefined;
//   }
// }