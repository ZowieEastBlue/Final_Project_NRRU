const db = require("../models");
const fs = require("fs");

const Mods = db.mods;
const User = db.user;
const Category = db.category;
const Theme = db.theme;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.uploadMods = async (req, res) => {
  try {
    // ตัวเลือก category
    // console.log(req.body);
    // console.log(req.files);
    let category = req.body.cat_id[0];
    let CategoryOption = req.body.cat_id[2];

    switch (category) {
      case "1":
        await Mods.create({
          m_name: req.body.m_name,
          m_detail: req.body.m_detail,
          theme_id: req.body.theme_id,
          cat_id: category,
          house_id: CategoryOption,
          user_id: req.body.user_id,
          m_file: req.files.m_file[0].path,
          m_img1: req.files.m_img1[0].path,
          m_img2: req.files.m_img2[0].path,
          m_img3: req.files.m_img3[0].path,
        });
        break;

      case "2":
        await Mods.create({
          m_name: req.body.m_name,
          m_detail: req.body.m_detail,
          theme_id: req.body.theme_id,
          cat_id: category,
          char_id: CategoryOption,
          user_id: req.body.user_id,
          m_file: req.files.m_file[0].path,
          m_img1: req.files.m_img1[0].path,
          m_img2: req.files.m_img2[0].path,
          m_img3: req.files.m_img3[0].path,
        });
        break;

      case "3":
        await Mods.create({
          m_name: req.body.m_name,
          m_detail: req.body.m_detail,
          theme_id: req.body.theme_id,
          cat_id: category,
          clot_id: CategoryOption,
          user_id: req.body.user_id,
          m_file: req.files.m_file[0].path,
          m_img1: req.files.m_img1[0].path,
          m_img2: req.files.m_img2[0].path,
          m_img3: req.files.m_img3[0].path,
        });
        break;

      case "4":
        await Mods.create({
          m_name: req.body.m_name,
          m_detail: req.body.m_detail,
          theme_id: req.body.theme_id,
          cat_id: category,
          shoe_id: CategoryOption,
          user_id: req.body.user_id,
          m_file: req.files.m_file[0].path,
          m_img1: req.files.m_img1[0].path,
          m_img2: req.files.m_img2[0].path,
          m_img3: req.files.m_img3[0].path,
        });
        break;

      case "5":
        await Mods.create({
          m_name: req.body.m_name,
          m_detail: req.body.m_detail,
          theme_id: req.body.theme_id,
          cat_id: category,
          furn_id: CategoryOption,
          user_id: req.body.user_id,
          m_file: req.files.m_file[0].path,
          m_img1: req.files.m_img1[0].path,
          m_img2: req.files.m_img2[0].path,
          m_img3: req.files.m_img3[0].path,
        });
        break;

      case "6":
        await Mods.create({
          m_name: req.body.m_name,
          m_detail: req.body.m_detail,
          theme_id: req.body.theme_id,
          cat_id: category,
          acc_id: CategoryOption,
          user_id: req.body.user_id,
          m_file: req.files.m_file[0].path,
          m_img1: req.files.m_img1[0].path,
          m_img2: req.files.m_img2[0].path,
          m_img3: req.files.m_img3[0].path,
        });
        break;

      case "7":
        await Mods.create({
          m_name: req.body.m_name,
          m_detail: req.body.m_detail,
          theme_id: req.body.theme_id,
          cat_id: category,
          hair_id: CategoryOption,
          user_id: req.body.user_id,
          m_file: req.files.m_file[0].path,
          m_img1: req.files.m_img1[0].path,
          m_img2: req.files.m_img2[0].path,
          m_img3: req.files.m_img3[0].path,
        });
        break;

      default:
        console.log(category);
    }

    res.status(201).json({ status: "ok", message: "อัปโหลดMODสำเร็จ" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// ทดลอง DownloadFile-------------------------------------
exports.downloadMods = async (req, res) => {};
// -------------------------------------------------

exports.ReadModsUser = async (req, res) => {
  try {
    const user = await Mods.findAll({ where: { user_id: req.params.id } });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.listMods = async (req, res) => {
  try {
    const mod = await Mods.findAll({});
    res.json(mod);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.listModsByTopDownload = async (req, res) => {
  try {
    const mod = await Mods.findAll({
      order: [["m_download", "DESC"]],
      limit: 3,
    });
    res.json(mod);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.getOneMods = async (req, res) => {
  try {
    // const mod = await Mods.findAll({ where: { m_id: req.params.id } });
    const mod = await Mods.findAll({
      where: { m_id: req.params.id },
      include: [
        {
          model: User,
        },
      ],
    });
    res.json(mod);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// เรียก Mods ตาม ID ผู้ใช้สำหรับการแก้ไข
exports.listModsForEdit = async (req, res) => {
  try {
    console.log("req=>", req.params);
    const mod = await Mods.findAll({ where: { user_id: req.params.id } });
    res.json(mod);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// ลบ Mods
exports.removeMods = async (req, res) => {
  try {
    const mods = await Mods.destroy({ where: { m_id: req.params.id } });
    res.status(201).json({ status: "ok", message: "ลบMODแล้ว" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// ค้นหาMODS ---------------------------------------------

// ค้นหาตามชื่อ(text)
const handleQuery = async (req, res, query) => {
  let mods = await Mods.findAll({
    where: { m_name: { [Op.like]: "%" + query + "%" } },
    include: [
      {
        model: Category,
      },
      {
        model: Theme,
      },
    ],
  });
  res.send(mods);
};

//ค้นหาด้วยหมวดหมู่
const handleCategory = async (req, res, category) => {
  console.log(req.body.category);
  let mods = await Mods.findAll({
    where: { cat_id: category },
    include: [
      {
        model: Category,
      },
      {
        model: Theme,
      },
    ],
  });
  res.send(mods);
};

// ค้นหาด้วย ธีม
const handleTheme = async (req, res, theme) => {
  let mods = await Mods.findAll({
    where: { theme_id: theme },
    include: [
      {
        model: Category,
      },
      {
        model: Theme,
      },
    ],
  });
  res.send(mods);
};

// function รวม Filter ทั้งหมด
exports.searchFilters = async (req, res) => {
  const { query, category, theme, filter } = req.body;

  //ค้นหาด้วย text
  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }

  //ค้นหาด้วย category
  // if (category) {
  //   console.log("category=>", category);
  //   await handleCategory(req, res, category);
  // }

  //ค้นหาด้วย theme
  if (theme) {
    console.log("theme=>", theme);
    await handleTheme(req, res, theme);
  }

  if (filter) {
    console.log("filter=>", filter);
    await handleCategory(req, res, filter);
  }
};
