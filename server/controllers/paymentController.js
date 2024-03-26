const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/paymentModel");
const Cart = require("../models/cartModel");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.stripePayment = async (req, res) => {
  const { price } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
};

exports.payment = async (req, res) => {
  const paymentInfo = req.body;
  try {
    const paymentRequest = await Payment.create(paymentInfo);

    // empty cart after payment
    const cartItemId = paymentInfo.cartItem.map((id) => new ObjectId(id));
    const deletedCart = await Cart.deleteMany({ _id: { $in: cartItemId } });

    res.status(200).json({ paymentRequest, deletedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  const email = req.query.email;
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden Access" });
    }
    const result = await Payment.find({ email: email })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
