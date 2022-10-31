module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define(
    "character",
    {
      char_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "char_id",
      },
      char_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "char_type",
      },
    },
    {
      tableName: "tb_character",
      timestamps: false,
    }
  );

  return Character;
};
