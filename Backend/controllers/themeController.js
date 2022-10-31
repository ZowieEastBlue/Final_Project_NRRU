const db = require("../models");

const Theme = db.theme;

// create
const addTheme = async (req, res) => {
  if (!req.body.theme_name) {
    res.status(400).json({
      message: "Pleases Inser Name",
    });
    return;
  }
  // สร้างข้อมูลธีม
  let themeInfo = {
    theme_name: req.body.theme_name,
  };
  //บันทึกข้อมูล
  try {
    const theme = await Theme.create(themeInfo);
    res.status(200).json(theme);
    console.log(theme);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error occured",
    });
  }
};

// get all theme
const listTheme = async (req, res) => {
  try {
    const theme = await Theme.findAll({});
    res.status(200).json(theme);
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

// get One theme
const readTheme = async (req, res) => {
  try {
    const theme = await Theme.findAll({ where: { theme_id: req.params.id } });
    res.json(theme);
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

module.exports = {
  addTheme,
  listTheme,
  readTheme,
};
