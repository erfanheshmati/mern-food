const express = require("express");
const cors = require("cors");
const menuRoute = require("./routes/menuRoute");
const cartRoute = require("./routes/cartRoute");
require("dotenv").config();
require("./database");

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/menu", menuRoute);
app.use("/cart", cartRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
