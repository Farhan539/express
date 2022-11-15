const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
var bcrypt = require("bcrypt");
const { throwError } = require("../utils/error.js");

let create = async (req, res) => {
  const data = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
  };

  let user = await User.create(data).catch((err) =>
    throwError(res, err.message, "User could not be created!")
  );
  await res.send({
    message: "user created successfully",
  });
};

let findAll = async (req, res) => {
  var queryObject = {
    ...(req.query.name && { name: { [Op.like]: `%${req.query.name}%` } }),
    ...(req.query.email && { email: { [Op.like]: `%${req.query.name}%` } }),
  };

  let users = await User.findAll({ where: queryObject }).catch((err) =>
    throwError(res, err.message, "Users could not be fetched!")
  );
  await res.send(users);
};

let findOne = async (req, res) => {
  const id = req.params.id;

  let user = await User.findByPk(id).catch((err) =>
    throwError(res, err.message, "User could not be fetched!")
  );
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({
      message: `Cannot find Tutorial with id=${id}.`,
    });
  }
};

let update = async (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  }).catch((err) => throwError(res, err.message, "User could not be updated!"));
  await res.send({
    message: "Tutorial was updated successfully.",
  });
};

let destroy = async (req, res) => {
  const id = req.params.id;
  let deletedUser = User.destroy({
    where: { id: id },
  }).catch((err) => throwError(res, err.message, "User could not be deleted!"));
  await res.send({
    message: "Tutorial was deleted successfully!",
  });
};

let login = async (req, res) => {
  let user = await User.findOne({
    attributes: ["password", "email", "id"],
    where: { email: req.body.email },
  }).catch((err) => throwError(res, err.message, "User could not be fetched!"));
  if (!user) {
    return res.status(404).send({
      message: "User Not found.",
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  var token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
    }
  );
  res.status(200).send({
    message: "Login successfull",
    accessToken: token,
  });
};

module.exports = { login, destroy, update, findOne, findAll, create };
