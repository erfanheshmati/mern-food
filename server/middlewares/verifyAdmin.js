const User = require("../models/userModel");

exports.verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await User.findOne({ email: email });
  const isAdmin = user?.role == "admin";
  if (!isAdmin) {
    return res.status(403).send({ message: "Forbidden Access!" });
  }
  next();
};
