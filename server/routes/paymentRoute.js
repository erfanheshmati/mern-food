const express = require("express");
const {
  payment,
  stripePayment,
  getAllOrders,
} = require("../controllers/paymentController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/stripe", stripePayment);
router.post("/", verifyToken, payment);
router.get("/", verifyToken, getAllOrders);

module.exports = router;
