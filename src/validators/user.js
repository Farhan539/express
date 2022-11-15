const { body, validationResult, query, param } = require("express-validator");

signupValidationRules = [
  body("name", "name is required").notEmpty(),
  body("email", "email is required").notEmpty(),
  body("password", "password is required").notEmpty(),
];

loginValidationRules = [
  body("email", "email is required").notEmpty(),
  body("password", "password is required").notEmpty(),
];

getAllValidationRules = [
  query("email", "email is required").optional(),
  query("password", "password is required").optional(),
];

updateValidationRules = [
  param("id", "id is required").notEmpty(),
  body("email", "email is required").optional(),
  body("password", "password is required").optional(),
];

parameterValidationRules = [param("id", "id is required").notEmpty()];

checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = {
  checkRules,
  signupValidationRules,
  loginValidationRules,
  getAllValidationRules,
  parameterValidationRules,
  updateValidationRules,
};
