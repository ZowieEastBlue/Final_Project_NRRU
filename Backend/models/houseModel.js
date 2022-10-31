module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    "house",
    {
      house_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "house_id",
      },
      house_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "house_type",
      },
    },
    {
      tableName: "tb_house",
      timestamps: false,
    }
  );

  return House;
};
