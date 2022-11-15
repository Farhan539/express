var { logger } = require("../config/logger.config");

function throwError(res, info, message, code) {
  logger.error({ message, info });
  res
    .status(code ? code : 400)
    .send({ message, info, status: code ? code : 400 });
}

module.exports = { throwError };
