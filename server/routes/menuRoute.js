const express = require("express");
const { getAllMenuItems } = require("../controllers/menuController");

const router = express.Router();

router.get("/", getAllMenuItems);

module.exports = router;
