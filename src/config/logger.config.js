var winston = require("winston");
require("winston-daily-rotate-file");

var debug = new winston.transports.DailyRotateFile({
  filename: "logs/debug/%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});
var error = new winston.transports.DailyRotateFile({
  filename: "logs/error/%DATE%.log",
  level: "error",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

var logger = winston.createLogger({
  transports: [debug, error],
});

module.exports = { logger };
