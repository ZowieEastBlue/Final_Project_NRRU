module.exports = (sequelize, DataTypes) => {
  const Hairstyle = sequelize.define(
    "hairstyle",
    {
      hair_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "hair_id",
      },
      hair_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "hair_type",
      },
    },
    {
      tableName: "tb_hairstyle",
      timestamps: false,
    }
  );

  return Hairstyle;
};
