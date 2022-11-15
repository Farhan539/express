const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("userName", "userName doesnt exists").exists(),
        body("email", "Invalid email").exists().isEmail(),
        body("phone").optional().isInt(),
        body("status").optional().isIn(["enabled", "disabled"]),
      ];
    }
  }
};
