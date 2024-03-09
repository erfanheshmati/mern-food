const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => console.log(`Server running on port ${port}`));

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB configuration
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Database and Collections
    const menuCollection = client.db("foodi").collection("menus");
    const cartCollection = client.db("foodi").collection("carts");
    // Menu items operation
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connected successfully");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
