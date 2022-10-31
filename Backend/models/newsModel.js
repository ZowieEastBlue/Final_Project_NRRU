module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    "news",
    {
      n_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "n_id",
      },
      n_cover: {
        type: DataTypes.STRING(255),
        // allowNull: false,
        field: "n_cover",
      },
      n_title: {
        type: DataTypes.STRING(255),
        // allowNull: false,
        field: "n_title",
      },
      n_detail: {
        type: DataTypes.TEXT,
        // allowNull: false,
        field: "n_detail",
      },
    },
    {
      tableName: "tb_news",
      timestamps: true,
      createdAt: "create_at",
      updatedAt: false,
    }
  );

  return News;
};
