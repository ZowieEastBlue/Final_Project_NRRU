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
    // if (rows.affectedRows === 1) {
    //   return res.json({ success: true });
    // }
    res.status(201).json({ success: true, message: "เพิ่มข่าวสำเร็จ" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

//เรียกข่าวทั้งหมด
exports.getAllNews = async (req, res) => {
  try {
    const rows = await News.findAll({});
    // if (rows.affectedRows === 1) {
    //   return res.json({ success: true });
    // }
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
