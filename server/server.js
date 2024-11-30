const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
const handlebars = require("express-handlebars");
const authRoutes = require("./routes/auth");
const tweetRoutes = require("./routes/tweet");
const profileRoutes = require("./routes/profile");

const app = express();
const redisClient = createClient();

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/projthree", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/auth", authRoutes);
app.use("/tweets", tweetRoutes);
app.use("/profile", profileRoutes);

app.use((req, res) => {
  res.status(404).render("error", { message: "Page not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));