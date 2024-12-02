//require('dotenv').config();
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const session = require("express-session");
const compression = require('compression');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const RedisStore = require("connect-redis").default;
//const { createClient } = require("redis");
const handlebars = require("express-handlebars");
const helmet = require('helmet');
const redis = require('redis');

// Import route files
const authRoutes = require("./routes/auth");
const tweetRoutes = require("./routes/tweet");
const profileRoutes = require("./routes/profile");

const port = process.env.PORT || process.env.PORT || 3000;


// MongoDB connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/projthree';
mongoose.connect(dbURI).catch((err) => {
  if (err) {
    console.log(err, ' - Could not connect to database');
    throw err;
  }
});

const redisClient = redis.createClient({
  url: process.env.REDISCLOUD_URL,
});

redisClient.connect().then(() => {
  const app = express();

  app.use(helmet());
  app.use('/assets', express.static(path.resolve(__dirname, '../client')));
  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.use(favicon(path.join(__dirname, '../client/favicon.png')));
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(session({
    key: 'sessionid',
    secret: 'Stuff',
    store: new RedisStore({ client: redisClient }),
    resave: true,
    saveUninitialized: true,
  }));

  app.engine('handlebars', handlebars.engine({ defaultLayout: '' }));
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '../views'));
 
  // Use the imported routes
  app.use('/auth', authRoutes);
  app.use('/tweets', tweetRoutes);
  app.use('/profile', profileRoutes);

  app.listen(port, (err) => {
    if (err) { throw err; }
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.log('Redis Client Error', err);
});