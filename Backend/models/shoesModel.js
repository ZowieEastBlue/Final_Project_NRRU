module.exports = (sequelize, DataTypes) => {
  const Shoes = sequelize.define(
    "shoes",
    {
      shoe_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "shoe_id",
      },
      shoe_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "shoe_type",
      },
    },
    {
      tableName: "tb_shoes",
      timestamps: false,
    }
  );

  return Shoes;
};
