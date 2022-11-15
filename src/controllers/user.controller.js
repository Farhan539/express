const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
var bcrypt = require("bcrypt");

let create = async (req, res) => {
  const data = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
  };

  let user = User.create(data).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial.",
    });
  });
  await res.send({
    message: "user created successfully",
  });
};

let findAll = async (req, res) => {
  var queryObject = {
    ...(req.query.name && { name: { [Op.like]: `%${req.query.name}%` } }),
    ...(req.query.email && { email: { [Op.like]: `%${req.query.name}%` } }),
  };

  let users = await User.findAll({ where: queryObject }).catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  });
  await res.send(users);
};

let findOne = async (req, res) => {
  const id = req.params.id;

  let user = await User.findByPk(id).catch((err) => {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id,
    });
  });
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
  }).catch((err) => {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id,
    });
  });
  await res.send({
    message: "Tutorial was updated successfully.",
  });
};

let destroy = async (req, res) => {
  const id = req.params.id;
  let deletedUser = User.destroy({
    where: { id: id },
  }).catch((err) => {
    res.status(500).send({
      message: "Could not delete Tutorial with id=" + id,
    });
  });
  await res.send({
    message: "Tutorial was deleted successfully!",
  });
};

let login = async (req, res) => {
  let user = await User.findOne({
    where: { email: req.body.email },
  });
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
