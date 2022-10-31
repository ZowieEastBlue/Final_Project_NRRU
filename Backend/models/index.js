const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// รวม Models
db.user = require("./userModel")(sequelize, DataTypes);
db.theme = require("./themeModel")(sequelize, DataTypes);
db.category = require("./categoryModel")(sequelize, DataTypes);
db.house = require("./houseModel")(sequelize, DataTypes);
db.character = require("./characterModel")(sequelize, DataTypes);
db.accessories = require("./accessoriesModel")(sequelize, DataTypes);
db.clothes = require("./clothesModel")(sequelize, DataTypes);
db.furniture = require("./furnitureModel")(sequelize, DataTypes);
db.hairstyle = require("./hairstyleModel")(sequelize, DataTypes);
db.shoes = require("./shoesModel")(sequelize, DataTypes);
db.mods = require("./modsModel")(sequelize, DataTypes);
db.news = require("./newsModel")(sequelize, DataTypes);

// กำหนดความสำพันธ์--------------------------------------------------------------
// TB_House
db.category.hasMany(db.house, {
  foreignKey: { name: "cat_id", field: "cat_id" },
});
db.house.belongsTo(db.category, { foreignKey: "cat_id" });

// TB_Character
db.category.hasMany(db.character, {
  foreignKey: { name: "cat_id", field: "cat_id" },
});
db.character.belongsTo(db.category, { foreignKey: "cat_id" });

// TB_Accessories.
db.category.hasMany(db.accessories, {
  foreignKey: { name: "cat_id", field: "cat_id" },
});
db.accessories.belongsTo(db.category, { foreignKey: "cat_id" });

// TB_Clothes
db.category.hasMany(db.clothes, {
  foreignKey: { name: "cat_id", field: "cat_id" },
});
db.clothes.belongsTo(db.category, { foreignKey: "cat_id" });

// TB_Furniture
db.category.hasMany(db.furniture, {
  foreignKey: { name: "cat_id", field: "cat_id" },
});
db.furniture.belongsTo(db.category, { foreignKey: "cat_id" });

// TB_Hairstyle
db.category.hasMany(db.hairstyle, {
  foreignKey: { name: "cat_id", field: "cat_id" },
});
db.hairstyle.belongsTo(db.category, { foreignKey: "cat_id" });

// TB_Shoes
db.category.hasMany(db.shoes, {
  foreignKey: { name: "cat_id", field: "cat_id" },
});
db.shoes.belongsTo(db.category, { foreignKey: "cat_id" });

// TB_MODs--------------------------------------------------------------

// FK User ID
db.user.hasMany(db.mods, {
  foreignKey: { name: "user_id", field: "user_id" },
});
db.mods.belongsTo(db.user, { foreignKey: "user_id" });

// FK Theme ID
db.theme.hasMany(db.mods, {
  foreignKey: { name: "theme_id", field: "theme_id" },
});
db.mods.belongsTo(db.theme, { foreignKey: "theme_id" });

// FK Category ID
db.category.hasMany(db.mods, {
  foreignKey: { name: "cat_id", field: "cat_id" },
});
db.mods.belongsTo(db.category, { foreignKey: "cat_id" });

// FK House ID
db.house.hasMany(db.mods, {
  foreignKey: { name: "house_id", field: "house_id" },
});
db.mods.belongsTo(db.house, { foreignKey: "house_id" });

// FK Character ID
db.character.hasMany(db.mods, {
  foreignKey: { name: "char_id", field: "char_id" },
});
db.mods.belongsTo(db.character, { foreignKey: "char_id" });

// FK Clothes ID
db.clothes.hasMany(db.mods, {
  foreignKey: { name: "clot_id", field: "clot_id" },
});
db.mods.belongsTo(db.clothes, { foreignKey: "clot_id" });

// FK Clothes ID
db.clothes.hasMany(db.mods, {
  foreignKey: { name: "clot_id", field: "clot_id" },
});
db.mods.belongsTo(db.clothes, { foreignKey: "clot_id" });

// FK Shoes ID
db.shoes.hasMany(db.mods, {
  foreignKey: { name: "shoe_id", field: "shoe_id" },
});
db.mods.belongsTo(db.shoes, { foreignKey: "shoe_id" });

// FK Furniture ID
db.furniture.hasMany(db.mods, {
  foreignKey: { name: "furn_id", field: "furn_id" },
});
db.mods.belongsTo(db.furniture, { foreignKey: "furn_id" });

// FK Accessories ID
db.accessories.hasMany(db.mods, {
  foreignKey: { name: "acc_id", field: "acc_id" },
});
db.mods.belongsTo(db.accessories, { foreignKey: "acc_id" });

// FK Hairstyle ID
db.hairstyle.hasMany(db.mods, {
  foreignKey: { name: "hair_id", field: "hair_id" },
});
db.mods.belongsTo(db.hairstyle, { foreignKey: "hair_id" });

module.exports = db;
