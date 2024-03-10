const express = require("express");
const {
  getAllCart,
  addToCart,
  deleteCartItem,
  updateCartItem,
  getSingleCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getAllCart);
router.get("/:id", getSingleCart);
router.post("/", addToCart);
router.delete("/:id", deleteCartItem);
router.put("/:id", updateCartItem);

module.exports = router;
