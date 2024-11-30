const express = require("express");
const Tweet = require("../models/Tweet");
const router = express.Router();

router.get("/", async (req, res) => {
  const tweets = await Tweet.find().populate("author").sort({ createdAt: -1 });
  res.json(tweets);
});

router.post("/", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { content } = req.body;
  const tweet = new Tweet({ content, author: req.session.userId });
  await tweet.save();
  res.status(201).json(tweet);
});

module.exports = router;