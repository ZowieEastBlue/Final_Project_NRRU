module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        // field: "user_id",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // field: "email",
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        // field: "passowrd",
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // field: "username",
      },
      user_img: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: `../uploads/avatar/user-profile-default-image.png`,
        field: "user_img",
      },
      user_level: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: "0",
        // field: "user_level",
      },
      user_description: {
        type: DataTypes.TEXT,
        // allowNull: false,
        // field: "user_description",
      },
      create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "create_at",
      },
    },
    {
      tableName: "tb_user",
      timestamps: true,
      createdAt: "create_at",
      updatedAt: false,
    }
  );

  return User;
};
