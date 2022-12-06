const db = require("../models");
const fs = require("fs");

const Mods = db.mods;
const User = db.user;
const Category = db.category;
const Theme = db.theme;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { QueryTypes } = require("sequelize");

// upload mods
exports.uploadMods = async (req, res) => {
  try {
    // ตัวเลือก category
    // console.log(req.body);
    console.log(req.files);
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

// update mods
exports.updateMods = async (req, res) => {
  try {
    // ตัวเลือก category
    // console.log(req.body);
    console.log(req.files);
    console.log(req.body);
    let category = req.body.cat_id[0];
    let CategoryOption = req.body.cat_id[2];

    // res.status(201).json({ status: "ok", message: "อัปโหลดMODสำเร็จ" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// download mods
exports.downloadMods = async (req, res) => {
  const Dmods = await Mods.findAll({
    where: {
      m_id: req.params.id,
    },
  });

  const file = await Dmods[0].m_file;

  const UpdateCount = Mods.update(
    {
      m_download: Sequelize.literal(`m_download + ${1}`),
    },
    {
      where: {
        m_id: req.params.id,
      },
    }
  );

  res.download(file);
};
// -------------------------------------------------

// เรียก mod จาก id ผู้ใช้แสดงหน้าโปรไฟล์
exports.ReadModsUser = async (req, res) => {
  try {
    const user = await Mods.findAll({ where: { user_id: req.params.id } });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// เรียกดู Mods ทั้งหมด
exports.listMods = async (req, res) => {
  try {
    const mod = await Mods.findAll({
      include: [{ model: User, required: true }],
      order: [["create_at", "DESC"]],
    });
    res.json(mod);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.listModsTop = async (req, res) => {
  try {
    const mod = await Mods.findAll({
      include: [{ model: User, required: true }],
      order: [["m_download", "DESC"]],
      limit: 3,
    });
    res.json(mod);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.LastMods = async (req, res) => {
  try {
    const mod = await Mods.findAll({
      include: [{ model: User, required: true }],
      order: [["create_at", "DESC"]],
      limit: 3,
    });
    res.json(mod);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// เรียก Mods เรียงจากยอดดาวน์โหลดสูงสุด
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

// เรียก MOds จาก ID
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

//เรียก Mods By ID เพื่อแก้ไข
exports.ReadModsToEditByID = async (req, res) => {
  try {
    console.log("req=>", req.params);
    const mod = await Mods.findAll({ where: { m_id: req.params.id } });
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
  if (!query) {
    const mod = await Mods.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Theme,
        },
      ],
    });

    res.send(mod);
    return;
  } else {
    let mods = await Mods.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Theme,
        },
      ],
      where: {
        [Op.or]: [
          { m_name: { [Op.like]: "%" + query + "%" } },
          // { cat_id: { [Op.like]: "%" + query + "%" } },
        ],
        // cat_name: { [Op.like]: "%" + query + "%" },
      },
    });
    res.send(mods);
  }
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

const handleFilter = async (req, res, theme) => {
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
};

exports.getFilters = async (req, res) => {
  console.log(req.body);
  let mods = await Mods.findAll({
    where: {
      [Op.and]: [{ cat_id: req.body.category }, { theme_id: req.body.theme }],
    },
  });

  res.status(200).json(mods);
};

// function รวม Filter ทั้งหมด
exports.searchFilters = async (req, res) => {
  console.log(req.body);
  // const { query, category, theme, filter } = req.body;

  //ค้นหาด้วย text
  // if (query) {
  //   // console.log("query", query);
  //   await handleQuery(req, res, query);
  // }

  // ค้นหาด้วย category
  // if (category) {
  //   // console.log("category=>", category);
  const { query } = req.body;

  // //ค้นหาด้วย text
  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }

  // // ค้นหาด้วย category
  // if (category) {
  //   console.log("category=>", category);
  //   await handleCategory(req, res, category);
  // }

  // //ค้นหาด้วย theme
  // if (theme) {
  //   // console.log("theme=>", theme);
  //   console.log("theme=>", theme);
  //   await handleTheme(req, res, theme);
  // }

  // if (filter) {
  //   // console.log("filter=>", filter);
  //   await handleFilter(req, res, filter);
  // }
  //   console.log("filter=>", filter);
  //   await handleCategory(req, res, filter);
  // }
};

exports.FilterCategory = async (req, res) => {
  console.log(req.body);
  const where = {};

  const {
    category,
    theme,
    house,
    character,
    clothes,
    shoes,
    furniture,
    accessories,
    hairstyle,
  } = req.body;
  if (category) where.cat_id = { [Op.eq]: category };
  if (theme) where.theme_id = { [Op.in]: theme };
  if (house) where.house_id = { [Op.in]: house };
  if (character) where.char_id = { [Op.in]: character };
  if (clothes) where.clot_id = { [Op.in]: clothes };
  if (shoes) where.shoe_id = { [Op.in]: shoes };
  if (furniture) where.furn_id = { [Op.in]: furniture };
  if (accessories) where.acc_id = { [Op.in]: accessories };
  if (hairstyle) where.hair_id = { [Op.in]: hairstyle };
  // console.log(where);

  const mods = await Mods.findAll({
    where: {
      ...where,
    },
  });

  res.status(200).json(mods);
};

// list mods ตาม category
exports.listModsByCategory = async (req, res) => {
  let mods = await Mods.findAll({
    where: { cat_id: req.params.id },
  });

  res.status(200).json(mods);
};

// สำหรับ DashBoard----------------------------------------------------------------------------------------------------------
exports.getModGropByMonth = async (req, res) => {
  let mods = await Mods.findAll({
    attributes: [
      [Sequelize.fn("MONTH", Sequelize.col("create_At")), "Month"],
      [Sequelize.fn("COUNT", Sequelize.col("m_id")), "Total"],
    ],
    group: [Sequelize.fn("MONTH", Sequelize.col("create_At")), "Month"],
  });

  res.send(mods);
};

exports.getSumDownload = async (req, res) => {
  let mods = await Mods.sum("m_download");

  res.json(mods);
};

exports.getAllModsOrderID = async (req, res) => {
  try {
    const mod = await Mods.findAll({
      include: [{ model: User, required: true }],
      order: [["m_id", "ASC"]],
    });
    res.json(mod);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.getAllModsOrderDate = async (req, res) => {
  try {
    const mod = await Mods.findAll({
      include: [{ model: User, required: true }],
      order: [["create_at", "DESC"]],
    });
    res.json(mod);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.getAllModsOrderDownload = async (req, res) => {
  try {
    const mod = await Mods.findAll({
      include: [{ model: User, required: true }],
      order: [["m_download", "DESC"]],
    });
    res.json(mod);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
