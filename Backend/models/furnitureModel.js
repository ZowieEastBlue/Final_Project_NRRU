module.exports = (sequelize, DataTypes) => {
  const Furniture = sequelize.define(
    "furniture",
    {
      furn_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "furn_id",
      },
      furn_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "furn_type",
      },
    },
    {
      tableName: "tb_furniture",
      timestamps: false,
    }
  );

  return Furniture;
};
