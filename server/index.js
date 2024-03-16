const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const menuRoute = require("./routes/menuRoute");
const cartRoute = require("./routes/cartRoute");
const userRoute = require("./routes/userRoute");

require("dotenv").config();
require("./database");

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// JWT Authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1hr" });
  res.send({ token });
});

// Routes
app.use("/menu", menuRoute);
app.use("/cart", cartRoute);
app.use("/user", userRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
