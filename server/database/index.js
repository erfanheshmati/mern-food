const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB connection failed", error));
