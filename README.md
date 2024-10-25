Prueba de embeddings en mongo y calculos vectoriales desde la ia local.

La local AI utilizada es llama-2-13b-chat.ggmlv3.q2_K con la version: llamafile-0.7.1 para que funcione correctamente los embeddings de los textos.

Se ejecuta con el siguiente comando en Windows:
llamafile-0.7.1  --server --host 0.0.0.0 --embedding -ngl 0 --model ./TinyLlama-1.1B-Chat-v1.0.Q2_K.gguf

 -	games.pdf -> Es un pdf sobre historia de los videojuegos redactados por chatgpt. Tiene 1000 palabras en total.
 -	ia.mjs -> Primer contacto con la vectorización de textos usando langchain.
 -	ia2.mjs -> Intento de uso de la librería LlamaCppEmbeddings de langchain.
 -	ia3.mjs -> Prueba de uso con text-embedding-3-large.
 -	ia4.mjs -> Prueba de RecursiveCharacterTextSplitter de langchain para separar el texto y prueba de guardado en mongo atlas de la nube.
 -	ia5.mjs -> Además de lo anterior, aquí extraigo los vectores cercanos de una query que primero la vectorizo y se la paso al prompt de la local AI.
 -	index.js -> Lógica para conectarse a mongo y sus funciones correspondientes para los ficheros anteriores.
 -	chat.mjs -> Lógica del ChatOpenAI donde le paso los datos para que me responda la local AI.




