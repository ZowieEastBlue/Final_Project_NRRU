const express = require("express");
const router = express.Router();
const multer = require("multer");

// controller
const {
  listUsers,
  readUsers,
  updateUsers,
  removeUsers,
  uploadAvatarUser,
  getUserGropByMonth,
} = require("../controllers/usersController");

//middleware
const { auth } = require("../middleware/auth");
const { uploadAvatarMiddleware } = require("../middleware/upload");

//@Endpoint  http://localhost:5000/api/users
//@Method   GET
//@Access   Private
router.get("/users", listUsers);

//@Endpoint  http://localhost:5000/api/users/:id
//@Method   GET
//@Access   Private
router.get("/users/:id", readUsers);

//@Endpoint  http://localhost:5000/api/users/:id
//@Method   PUT
//@Access   Private
// อัพเดทโปรไฟล์
router.put("/users/:id", updateUsers);

//@Endpoint  http://localhost:5000/api/users/uploadavatar/:id
//@Method   PUT
//@Access   Private
// อัพเดทรูปโปรไฟล์
router.put(
  "/users/uploadavatar/:id",
  auth,
  uploadAvatarMiddleware,
  uploadAvatarUser
);

//@Endpoint  http://localhost:5000/api/users/:id
//@Method   DELETE
//@Access   Private
router.delete("/users/:id", auth, removeUsers);

//สำหรับ dashboard--------------------------------
router.get("/users/getUserGroupBy/Mouth", getUserGropByMonth);

module.exports = router;
