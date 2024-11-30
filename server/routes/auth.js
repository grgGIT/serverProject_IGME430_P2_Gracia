const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.comparePassword(password))) {
    req.session.userId = user._id;
    res.json({ message: "Logged in successfully" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

router.post("/change-password", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.session.userId);
  if (user && await user.comparePassword(oldPassword)) {
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password changed successfully" });
  } else {
    res.status(400).json({ error: "Invalid password" });
  }
});

module.exports = router;