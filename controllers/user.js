const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).send({ msg: "Email already used" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phone, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
    res.status(200).send({ msg: "User registered", user: newUser, token });
  } catch (err) {
    res.status(500).send({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ msg: "Bad credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ msg: "Bad credentials" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.status(200).send({ msg: "Login success", user, token });
  } catch (err) {
    res.status(500).send({ msg: "Login failed" });
  }
};

// GET all users (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide passwords
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ msg: "Error fetching users" });
  }
};

// DELETE user (admin)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "User deleted" });
  } catch (err) {
    res.status(500).send({ msg: "Deletion failed" });
  }
};

// UPDATE user (admin)
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    res.status(200).send(updated);
  } catch (err) {
    res.status(500).send({ msg: "Update failed" });
  }
};
