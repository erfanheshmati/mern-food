const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  transactionId: String,
  email: String,
  price: Number,
  quantity: Number,
  status: String,
  itemName: Array,
  cartItem: Array,
  menuItem: Array,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
