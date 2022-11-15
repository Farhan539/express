var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./src/routes/index");
var userRouter = require("./src/routes/users");
var { authMiddleware, unless } = require("./src/middlewares/auth");
var { logMiddleware } = require("./src/middlewares/log");
const db = require("./src/models/index");
const expressValidator = require("express-validator");

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(unless(authMiddleware, "/users/login", "/users/signup"), logMiddleware);
app.use("/", indexRouter);
app.use("/users", userRouter);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
module.exports = app;
