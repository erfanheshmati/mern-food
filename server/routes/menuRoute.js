const express = require("express");
const {
  getAllMenuItems,
  createMenuItem,
  deleteMenuItem,
  getSingleMenuItem,
  updateMenuItem,
} = require("../controllers/menuController");

const router = express.Router();

router.get("/", getAllMenuItems);
router.get("/:id", getSingleMenuItem);
router.post("/", createMenuItem);
router.delete("/:id", deleteMenuItem);
router.patch("/:id", updateMenuItem);

module.exports = router;
