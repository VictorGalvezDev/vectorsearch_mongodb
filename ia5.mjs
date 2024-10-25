import pkg from './index.js';
import { OpenAIEmbeddings } from "@langchain/openai";
import { readPdfText } from "pdf-text-reader";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { chat } from './chat.mjs';

const { store, getData, aggregate } = pkg;


const embeddings = new OpenAIEmbeddings({
    apiKey: "empty",
    batchSize: 512, // Default value if omitted is 512. Max is 2048
    model: "LLaMA_CPP",
    configuration: {
        baseURL: "http://127.0.0.1:8081/v1",
    }
});


async function splittearInfo() {
    console.log("leyendo pdf...");
    const resultPdf = await readPdfText({ url: "./games.pdf" })


    console.log("spliteando..");

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 10,
    });

    // const output = await splitter.createDocuments([resultPdf]);
    return await splitter.createDocuments([resultPdf]);

    //Parece que no funciona correctamente el chunkoverlap
    // console.log(output[1].pageContent + "\n\n" + output[2].pageContent);
}

async function embeddingDocs(data) {
    const dataEmbedded = []
    console.log("embedideando...");



    for (let index = 0; index < data.length; index++) {

        // console.log(index + " = " + data[index].pageContent);

        const vectors = await embeddings.embedDocuments([data[index].pageContent]);
        dataEmbedded.push({
            id: index,
            document: data[index],
            embedding: vectors
        })
    }

    return dataEmbedded
}


async function calculateVectors(query) {
    const embeddedQuery = await embeddings.embedDocuments([query]);
    const agg = [
        {
            '$vectorSearch': {
                'index': 'index_euclidean_gameHistory',
                'path': 'embedding',
                'queryVector': embeddedQuery[0],
                'numCandidates': 100,
                'limit': 5
            }
        }, {
            '$project': {
                '_id': 0,
                'document.pageContent': 1,
                'score': {
                    '$meta': 'vectorSearchScore'
                }
            }
        }
    ];

    const result = await aggregate(agg);
    const combinedContent = result.map(entry => entry.document.pageContent).join(' ');
    return combinedContent
}



// await embeddingDocs(await splittearInfo())

// const data = await embeddingDocs(await splittearInfo())
// await store(data)

const query = "What industries are leading the charge?"
const result = await calculateVectors(query)
console.log(await chat(result, "Is the best going to come in the info?"));


// console.log(await chat("Hi, my name is Victor, im 26 years old and i like chocolate because Juan said that.", "What do Victor likes in the info?"));







