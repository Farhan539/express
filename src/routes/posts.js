var express = require("express");
var router = express.Router();
const posts = require("../controllers/post.controller.js");

router.post("/", posts.create);
router.get("/", posts.findAll);
router.get("/:id", posts.findOne);
router.put("/:id", posts.update);
router.delete("/:id", posts.destroy);

module.exports = router;
