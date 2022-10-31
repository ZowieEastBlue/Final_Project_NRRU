module.exports = (sequelize, DataTypes) => {
  const Clothes = sequelize.define(
    "clothes",
    {
      clot_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "clot_id",
      },
      clot_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "clot_type",
      },
    },
    {
      tableName: "tb_clothes",
      timestamps: false,
    }
  );

  return Clothes;
};
