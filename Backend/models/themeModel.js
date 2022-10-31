module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define(
    "theme",
    {
      theme_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "theme_id",
      },
      theme_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "theme_name",
      },
    },
    {
      tableName: "tb_theme",
      timestamps: false,
    }
  );

  return Theme;
};
