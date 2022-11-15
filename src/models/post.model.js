module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "post",
    {
      title: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      paranoid: true,
    }
  );

  return Post;
};
