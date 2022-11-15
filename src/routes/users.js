var express = require("express");
var router = express.Router();
const users = require("../controllers/user.controller.js");
const {
  checkRules,
  signupValidationRules,
  loginValidationRules,
  getAllValidationRules,
  parameterValidationRules,
  updateValidationRules,
} = require("../validators/user.js");

router.post("/signup", signupValidationRules, checkRules, users.create);
router.get("/", getAllValidationRules, checkRules, users.findAll);
router.get("/:id", parameterValidationRules, checkRules, users.findOne);
router.put("/:id", updateValidationRules, checkRules, users.update);
router.delete("/:id", parameterValidationRules, checkRules, users.destroy);
router.post("/login", loginValidationRules, checkRules, users.login);

module.exports = router;
