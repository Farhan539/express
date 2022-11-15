const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
var { logger } = require("../config/logger.config");
function logMiddleware(req, res, next) {
  let request =
    req.method +
    " " +
    req.originalUrl +
    " request from " +
    req.ip +
    " at " +
    new Date();
  logger.info(request);

  next();
}

module.exports = { logMiddleware };
