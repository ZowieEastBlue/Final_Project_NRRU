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
  downloadMods,
  listModsByTopDownload,
  ReadModsToEditByID,
  getFilters,
  getModGropByMonth,
  getSumDownload,
  getAllModsOrderID,
  getAllModsOrderDate,
  getAllModsOrderDownload,
  LastMods,
  listModsTop,
  FilterCategory,
  listModsByCategory,
} = require("../controllers/modsController");

const { auth } = require("../middleware/auth");

// Middleware
const { uploadModMiddleware } = require("../middleware/upload");

//@Endpoint  http://localhost:5000/api/mods
//@Method   POST
//@Access   Private
router.post("/mods", uploadModMiddleware, uploadMods);

// Download
router.get("/mods/download/:id", downloadMods);

//@Endpoint  http://localhost:5000/api/mods/users/:id
//@Method   GET
//@Access   Publish
router.get("/mods/users/:id", ReadModsUser);

//@Endpoint  http://localhost:5000/api/mods
//@Method   GET
//@Access   Publish
router.get("/mods", listMods);
router.get("/mods/last", LastMods);
router.get("/mods/top", listModsTop);

router.get("/mods/listByTopdownload", listModsByTopDownload);

//@Endpoint  http://localhost:5000/api/mods
//@Method   GET
//@Access   Publish
router.get("/onemods/:id", getOneMods);

//@Endpoint  http://localhost:5000/api/mods
//@Method   GET
//@Access   Publish
router.get("/listmodsForEdit/:id", listModsForEdit);
router.get("/ReadModsToEdit/:id", ReadModsToEditByID);

//@Endpoint  http://localhost:5000/api/mods
//@Method   GET
//@Access   Publish
router.delete("/mods/removemods/:id", removeMods);

//@Endpoint  http://localhost:5000/api/search/filters
//@Method   POST
//@Access   Publish
// Search
router.post("/search/filters", searchFilters);
router.post("/search/getFilters", getFilters);

//ทดลอง Filter
router.post("/filter/mods/", FilterCategory);
router.get("/listmodsByCategory/:id", listModsByCategory);

//Routes สำหรับหน้า Dashboard-------------------------------------------------------
router.get("/mods/getModGroupBy/Month", getModGropByMonth);
router.get("/mods/getSumDownload", getSumDownload);
router.get("/mods/getAllModsOrderID", getAllModsOrderID);
router.get("/mods/getAllModsOrderDate", getAllModsOrderDate);
router.get("/mods/getAllModsOrderDownload", getAllModsOrderDownload);

module.exports = router;
