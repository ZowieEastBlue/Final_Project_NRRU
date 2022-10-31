const express = require("express");
const router = express.Router();

const {
  addTheme,
  listTheme,
  readTheme,
} = require("../controllers/themeController");

//@Endpoint  http://localhost:5000/api/theme
//@Method   POST
//@Access   Publish
router.post("/theme", addTheme);
router.get("/theme", listTheme);
router.get("/theme/:id", readTheme);

module.exports = router;
