const db = require("../models");

const Category = db.category;
const Shoes = db.shoes;
const House = db.house;
const Hairstyle = db.hairstyle;
const Furniture = db.furniture;
const Clothes = db.clothes;
const Character = db.character;
const Accessories = db.accessories;

// Category-----------------------------------
const listCategory = async (req, res) => {
  try {
    const category = await Category.findAll({});
    res.json(category);
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

// Category Option-------------------------------

// Shoes
const listShoes = async (req, res) => {
  try {
    const shoes = await Shoes.findAll({});
    res.json(shoes);
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

// House
const listHouse = async (req, res) => {
  try {
    const house = await House.findAll({});
    res.json(house);
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

// Hairstyle
const listHairstyle = async (req, res) => {
  try {
    const hairstyle = await Hairstyle.findAll({});
    res.json(hairstyle);
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

// Furniture
const listFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findAll({});
    res.json(furniture);
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

// Clothes
const listClothes = async (req, res) => {
  try {
    const clothes = await Clothes.findAll({});
    res.json(clothes);
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

// Character
const listCharacter = async (req, res) => {
  try {
    const character = await Character.findAll({});
    res.json(character);
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

// Accessories
const listAccessories = async (req, res) => {
  try {
    const accessories = await Accessories.findAll({});
    res.json(accessories);
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

module.exports = {
  listCategory,
  listShoes,
  listHouse,
  listHairstyle,
  listFurniture,
  listClothes,
  listCharacter,
  listAccessories,
};
