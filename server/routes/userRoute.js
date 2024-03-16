const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.post("/", createUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);
router.get("/admin/:email", verifyToken, getAdmin);
router.patch("/admin/:id", verifyToken, verifyAdmin, makeAdmin);

module.exports = router;
