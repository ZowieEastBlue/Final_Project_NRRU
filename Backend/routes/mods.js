const express = require("express");
const router = express.Router();

// controller
const {
  uploadMods,
  ReadModsUser,
  listMods,
  getOneMods,
  listModsForEdit,
  removeMods,
  searchFilters,
} = require("../controllers/modsController");

const { auth } = require("../middleware/auth");

// Middleware
const { uploadModMiddleware } = require("../middleware/upload");

//@Endpoint  http://localhost:5000/api/mods
//@Method   POST
//@Access   Private
router.post("/mods", uploadModMiddleware, uploadMods);

//@Endpoint  http://localhost:5000/api/mods/users/:id
//@Method   GET
//@Access   Publish
router.get("/mods/users/:id", ReadModsUser);

//@Endpoint  http://localhost:5000/api/mods
//@Method   GET
//@Access   Publish
router.get("/mods", listMods);

//@Endpoint  http://localhost:5000/api/mods
//@Method   GET
//@Access   Publish
router.get("/onemods/:id", getOneMods);

//@Endpoint  http://localhost:5000/api/mods
//@Method   GET
//@Access   Publish
router.get("/listmodsForEdit/:id", listModsForEdit);

//@Endpoint  http://localhost:5000/api/mods
//@Method   DELETE
//@Access   Publish
router.delete("/mods/removemods/:id", removeMods);

//@Endpoint  http://localhost:5000/api/search/filters
//@Method   POST
//@Access   Publish
// Search
router.post('/search/filters', searchFilters)

module.exports = router;
