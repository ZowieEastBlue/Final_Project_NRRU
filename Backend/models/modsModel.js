module.exports = (sequelize, DataTypes) => {
  const Mods = sequelize.define(
    "mods",
    {
      m_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        field: "m_id",
      },
      m_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "m_name",
      },
      m_detail: {
        type: DataTypes.TEXT,
        // allowNull: false,
        field: "m_detail",
      },
      m_file: {
        type: DataTypes.TEXT,
        // allowNull: false,
        field: "m_file",
      },
      m_img1: {
        type: DataTypes.STRING(255),
        // allowNull: false,
        field: "m_img1",
      },
      m_img2: {
        type: DataTypes.STRING(255),
        // allowNull: false,
        field: "m_img2",
      },
      m_img3: {
        type: DataTypes.STRING(255),
        // allowNull: false,
        field: "m_img3",
      },
      m_download: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        field: "m_download",
        defaultValue: "0",
      },
      // user_id: {
      //   type: DataTypes.INTEGER(10),
      //   allowNull: false,
      //   field: "user_id",
      // },
      // theme_id: {
      //   type: DataTypes.INTEGER(10),
      //   allowNull: false,
      //   field: "theme_id",
      // },
      // cat_id: {
      //   type: DataTypes.INTEGER(10),
      //   allowNull: false,
      //   field: "cat_id",
      // },
    },
    {
      tableName: "tb_mods",
      timestamps: true,
      createdAt: "create_at",
      updatedAt: false,
    }
  );

  return Mods;
};
