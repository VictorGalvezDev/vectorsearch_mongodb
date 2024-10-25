import { ChatOpenAI } from "@langchain/openai";

const chatGPT = new ChatOpenAI({
    apiKey: "empty",
    batchSize: 512, // Default value if omitted is 512. Max is 2048
    model: "LLaMA_CPP",
    configuration: {
        baseURL: "http://127.0.0.1:8081/v1",
    }
});

export async function chat(data, query) {
console.log(data+"\n\n\n"+query);

    const messages = [
        ("system", `You are going to answer all my question using this info: ${data}. If you dont find the answer, just tell me that you didnt find the answer in that info.`),
        ("human", `${query}`),
    ]
    try {
        const answer = await chatGPT.invoke(messages)
        return answer.content
    } catch (error) {
        console.log("Se ha producido un error: " + error);
    }
}