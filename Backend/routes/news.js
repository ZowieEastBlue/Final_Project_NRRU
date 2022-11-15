const express = require("express");
const router = express.Router();

const {
  addNews,
  getAllNews,
  getOneNews,
  EditNews,
  RemoveNews,
} = require("../controllers/newsController");

const { uploadCoverNewsMiddleware } = require("../middleware/upload");

const { auth } = require("../middleware/auth");

//@Endpoint  http://localhost:5000/api/addnews
//@Method   POST
//@Access   Publish
router.post("/addnews", uploadCoverNewsMiddleware, addNews);
router.get("/getAllNews", getAllNews);
router.get("/getOneNews/:id", getOneNews);
router.put("/editnews/:id", uploadCoverNewsMiddleware, EditNews);
router.delete("/removeNews/:id", RemoveNews);

module.exports = router;
