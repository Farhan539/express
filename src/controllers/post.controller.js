const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

const { throwError } = require("../utils/error.js");

let create = async (req, res) => {
  const data = {
    title: req.body.title,
    body: req.body.body,
    UserId: req.user.id,
  };

  let post = await Post.create(data).catch((err) =>
    throwError(res, err.message, "Post could not be created!")
  );
  await res.send({
    message: "Post created successfully",
  });
};

let findAll = async (req, res) => {
  var queryObject = {
    ...(req.query.title && { title: { [Op.like]: `%${req.query.title}%` } }),
    UserId: req.user.id,
  };
  let posts = await Post.findAll({ where: queryObject }).catch((err) =>
    throwError(res, err.message, "Posts could not be fetched!")
  );
  await res.send(posts);
};

let findOne = async (req, res) => {
  const id = req.params.id;

  let post = await Post.findOne({
    where: {
      id,
      UserId: req.user.id,
    },
  }).catch((err) => throwError(res, err.message, "Post could not be fetched!"));
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({
      message: `Cannot find Post with id=${id}.`,
    });
  }
};

let update = async (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id, UserId: req.user.id },
  }).catch((err) => throwError(res, err.message, "User could not be updated!"));
  await res.send({
    message: "Tutorial was updated successfully.",
  });
};

let destroy = async (req, res) => {
  const id = req.params.id;
  let deletedUser = Post.destroy({
    where: { id: id, UserId: req.user.id },
  }).catch((err) => throwError(res, err.message, "User could not be deleted!"));
  await res.send({
    message: "Tutorial was deleted successfully!",
  });
};

module.exports = { destroy, update, findOne, findAll, create };
