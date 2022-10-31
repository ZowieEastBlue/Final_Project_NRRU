const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//image Upload
const multer = require("multer");
const path = require("path");
const uploadImage = require("../middleware/upload");

//Modal
const User = db.user;

exports.listUsers = async (req, res) => {
  try {
    const user = await User.findAll({});
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.readUsers = async (req, res) => {
  try {
    const user = await User.findAll({ where: { user_id: req.params.id } });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.updateUsers = async (req, res) => {
  try {
    res.send("hello update users");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// ลบ User
exports.removeUsers = async (req, res) => {
  try {
    const user = await User.destroy({ where: { user_id: req.params.id } });
    res.status(201).json({ status: "ok", message: "ลบผู้ใช้แล้ว" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// อัปโหลด User Image
exports.uploadAvatarUser = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.send("You must select a Image");
    }

    let Info = {
      user_img: req.file.path,
    };

    update_user = await User.update(Info, {
      where: { user_id: req.params.id },
    });
    let user = await User.findAll({ where: { user_id: req.params.id } });
    res.status(201).json({ status: "ok", message: "อัพเดตรูปสำเร็จ", user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
