const Menu = require("../models/menuModel");

exports.getAllMenuItems = async (req, res) => {
  try {
    const menu = await Menu.find({}).sort({ createdAt: -1 });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleMenuItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const menuItem = await Menu.findById(itemId);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMenuItem = async (req, res) => {
  const newItem = req.body;
  try {
    const existingItem = await Menu.findOne({ name: newItem.name });
    if (existingItem) {
      return res.status(302).json({ message: "Menu item already exists" });
    }
    const result = await Menu.create(newItem);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const deletedItem = await Menu.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  const itemId = req.params.id;
  const { name, category, price, recipe, image } = req.body;
  try {
    const updatedItem = await Menu.findByIdAndUpdate(
      itemId,
      { name, category, price, recipe, image },
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
