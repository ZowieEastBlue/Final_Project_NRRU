const db = require("../models");

const News = db.news;

//เพิ่มข่าว
exports.addNews = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const rows = await News.create({
      n_title: req.body.n_title,
      n_cover: req.file.path,
      n_detail: req.body.description,
    });
    res.status(201).json({ success: true, message: "เพิ่มข่าวสำเร็จ" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

//แก้ไขข่าว
exports.EditNews = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    if (req.file == undefined) {
      const rows = await News.update(
        {
          n_title: req.body.n_title,
          n_cover: req.body.n_cover,
          n_detail: req.body.description,
        },
        {
          where: { n_id: req.params.id },
        }
      );
      res.status(201).json({ success: true, message: "แก้ไขสำเร็จ" });
    } else {
      const rows = await News.update(
        {
          n_title: req.body.n_title,
          n_cover: req.file.path,
          n_detail: req.body.description,
        },
        {
          where: { n_id: req.params.id },
        }
      );
      res.status(201).json({ success: true, message: "แก้ไขสำเร็จ" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

//ลบข่าว
exports.RemoveNews = async (req, res) => {
  try {
    const news = await News.destroy({ where: { n_id: req.params.id } });
    res.status(201).json({ status: "ok", message: "ลบข่าวนี้แล้ว" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

//เรียกข่าวทั้งหมด
exports.getAllNews = async (req, res) => {
  try {
    const rows = await News.findAll({
      order: [["create_at", "DESC"]],
    });
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

//เรียกข่าวตาม ID
exports.getOneNews = async (req, res) => {
  try {
    const rows = await News.findAll({ where: { n_id: req.params.id } });
    // if (rows.affectedRows === 1) {
    //   return res.json({ success: true });
    // }
    res.status(200).json({ success: true, listId: rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
