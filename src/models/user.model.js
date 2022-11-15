var Post = require("./post.model.js");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
    },

    {
      paranoid: true,
    }
  );

  return User;
};
