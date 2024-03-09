const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

// database config
require("./db");

// middlewares
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server running on port ${port}`));
