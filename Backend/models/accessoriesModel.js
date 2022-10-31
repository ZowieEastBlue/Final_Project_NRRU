module.exports = (sequelize, DataTypes) => {
  const Accessories = sequelize.define(
    "accessories",
    {
      acc_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "acc_id",
      },
      acc_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "acc_type",
      },
    },
    {
      tableName: "tb_accessories",
      timestamps: false,
    }
  );

  return Accessories;
};
