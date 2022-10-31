const express = require("express");
const router = express.Router();

const {
  listCategory,
  listShoes,
  listHouse,
  listHairstyle,
  listFurniture,
  listClothes,
  listCharacter,
  listAccessories,
} = require("../controllers/categoryController");

//@Endpoint  http://localhost:5000/api/category
//@Method   GET
//@Access   Public
router.get("/category", listCategory);

// Option
router.get("/category/shoes", listShoes);
router.get("/category/house", listHouse);
router.get("/category/hairstyle", listHairstyle);
router.get("/category/furniture", listFurniture);
router.get("/category/clothes", listClothes);
router.get("/category/character", listCharacter);
router.get("/category/accessories", listAccessories);

// router.post("/category", (req, res) => {
//   res.send("Create category");
// });
// router.get("/category/:id", (req, res) => {
//   res.send("Read category");
// });
// router.put("/category/:id", (req, res) => {
//   res.send("Update category");
// });
// router.delete("/category/:id", (req, res) => {
//   res.send("Delete category");
// });

module.exports = router;
