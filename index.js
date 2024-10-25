const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://elsodah12:CEw7Vhr6lmsHAFkj@cluster0.y1imqx4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});


module.exports = {
    store: async function (data) {
      try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        const dbName = "GameHistory";
        const collectionName = "embeddings";
        const database = client.db(dbName);
        const collection = database.collection(collectionName);


        try {
          // const insertManyResult = await collection.insertOne(data);
          const insertManyResult = await collection.insertMany(data);
          console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
        } catch (err) {
          console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
        }


      } finally {
        await client.close();
      }
    },

  getData: async function () {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });

      const dbName = "AIEmbeddingsTest";
      const collectionName = "Vectors";
      const database = client.db(dbName);
      const collection = database.collection(collectionName);


      try {
        const data = await collection.find().toArray();
        return data;

      } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
        return undefined
      }
    } finally {
      await client.close();
    }
  },

  aggregate: async function (aggr) {
    console.log("agrr...");
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });

      const dbName = "GameHistory";
      const collectionName = "embeddings";
      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      const result = collection.aggregate(aggr)
      const resultArray = await result.toArray();
      console.log("aggregated correctly");
      // const a = await result.forEach((doc) => console.dir(JSON.stringify(doc)));
      return resultArray;
    } finally {
      await client.close();
    }
  }
}


// export async function store(data) {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });

//     const dbName = "AIEmbeddingsTest";
//     const collectionName = "Vectors";
//     const database = client.db(dbName);
//     const collection = database.collection(collectionName);


//     try {
//       const insertManyResult = await collection.insertMany(data);
//       console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
//     } catch (err) {
//       console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
//     }


//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
