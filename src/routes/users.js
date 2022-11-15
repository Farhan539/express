var express = require("express");
var router = express.Router();
const users = require("../controllers/user.controller.js");
const { validate } = require("../validators/user.js");

router.post("/signup", validate("create"), users.create);
router.get("/", users.findAll);
router.get("/:id", users.findOne);
router.put("/:id", users.update);
router.delete("/:id", users.destroy);
router.post("/login", users.login);

module.exports = router;
