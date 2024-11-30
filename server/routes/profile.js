const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = await User.findById(req.session.userId);
  res.json(user);
});

router.put("/", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { username, email } = req.body;
  const user = await User.findByIdAndUpdate(req.session.userId, { username, email }, { new: true });
  res.json(user);
});

module.exports = router;