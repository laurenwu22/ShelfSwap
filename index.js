import { MongoClient } from "mongodb";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello, World!</h1>");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})

// establish connection to MongoDB database
const uri =
  "mongodb+srv://laurenwu22:A7S4GrLFodA9EJp1@cluster0.txentwq.mongodb.net/";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    // database and collection
    const db = client.db("bookSwapDB");
    const coll = db.collection("users");

    // find code goes here
    const cursor = coll.find({ "username": "johndoe" });

    // iterate code goes here
    await cursor.forEach(console.log);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);