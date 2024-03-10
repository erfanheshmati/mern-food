const Cart = require("../models/cartModel");

exports.getAllCart = async (req, res) => {
  const email = req.query.email;
  try {
    const cartItem = await Cart.find({ email: email });
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Cart.findById(cartId);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { menuItemId, name, image, price, quantity, email } = req.body;
  try {
    const existingCartItem = await Cart.findOne({ menuItemId: menuItemId });
    if (existingCartItem) {
      return res
        .status(400)
        .json({ message: "Product already exists in your shopping cart" });
    }
    const cartItem = await Cart.create({
      menuItemId: menuItemId,
      name: name,
      image: image,
      price: price,
      quantity: quantity,
      email: email,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedItem = await Cart.findByIdAndDelete(cartId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, image, price, quantity, email } = req.body;
  try {
    const updatedItem = await Cart.findByIdAndUpdate(
      cartId,
      { quantity, price },
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
