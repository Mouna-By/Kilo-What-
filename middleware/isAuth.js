const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).send({ msg: "Invalid token" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

module.exports = isAuth;