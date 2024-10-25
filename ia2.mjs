import { LlamaCppEmbeddings } from "@langchain/community/embeddings/llama_cpp";

const llamaPath = "C:/Users/Victor/Desktop/FCT/ias/llama-2-13b-chat.ggmlv3.q2_K.bin";

const embeddings = new LlamaCppEmbeddings({
  modelPath: llamaPath,
});

const res = embeddings.embedQuery("Hello Llama!");

console.log(res);

/*
	[ 15043, 365, 29880, 3304, 29991 ]
*/