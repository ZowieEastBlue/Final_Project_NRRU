const express = require("express");
const router = express.Router();

// controller
const {
  register,
  editUser,
  login,
  getAllUser,
  currentUser,
} = require("../controllers/authController");

const { addTheme, getAllTheme } = require("../controllers/themeController");

//middleware
const { auth } = require("../middleware/auth");

//@Endpoint  http://localhost:5000/api/login
//@Method   POST
//@Access   Publish
router.post("/login", login);

//@Endpoint  http://localhost:5000/api/current-user
//@Method   POST
//@Access   Private
router.post("/current-user", auth, currentUser);

//@Endpoint  http://localhost:5000/api/auth
//@Method   GET
//@Access   Publish
router.get("/auth", getAllUser);

//@Endpoint  http://localhost:5000/api/register
//@Method   POST
//@Access   Publish
router.post("/register", register);

//@Endpoint  http://localhost:5000/api/auth/:id
//@Method   PUT
//@Access   Publish
router.put("/auth/:id", auth, editUser);

//@Endpoint  http://localhost:5000/api/auth
//@Method   DELETE
//@Access   Publish
router.delete("/auth", (req, res) => {
  res.send("Hello World DELETE");
});

module.exports = router;
