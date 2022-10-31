module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      cat_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "cat_id",
      },
      cat_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "cat_name",
      },
    },
    {
      tableName: "tb_category",
      timestamps: false,
    }
  );

  return Category;
};
