const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "Fullstack-Login-2021";

const User = db.user;

exports.login = async (req, res) => {
  const user = await User.findAll({ where: { email: req.body.email } });
  if (user.length == 0) {
    res.json({ status: "error", message: "ไม่พบผู้ใช้นี้" });
    return;
  }
  if (user) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (password_valid) {
      //Payload ที่จะส่งไปพร้อม token สำหรับยืนยันตัวตน
      const payload = {
        user: {
          user_id: user[0].user_id,
          email: user[0].email,
          level: user[0].user_level,
          username: user[0].username,
          user_img: user[0].user_img,
          user_description: user[0].user_description,
        },
      };

      // เช็ก user และ password ถ้าผ่านจะ Generate Token
      token = jwt.sign(
        payload,
        "jwtSecret",
        { expiresIn: "12h" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            status: "ok",
            message: "เข้าสู่ระบบสำเร็จ",
            token,
            payload,
          });
        }
      );
    } else {
      res.json({ status: "error", message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }
  } else {
    res.status(500).json({ status: "error", message: "login filed" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    // model User
    // console.log("controller=>", req.user);
    const user = await User.findOne({ where: { user_id: req.user.user_id } });
    res.send(user);
    // console.log("auth user", user);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error!");
  }
};

exports.register = async (req, res) => {
  try {
    //Check user
    let user = await User.findAll({ where: { email: req.body.email } });
    if (user.length == 1) {
      res.json({ status: "error", message: "มี Email นี้แล้ว" });
      return;
    }
    const salt = await bcrypt.genSalt(10);

    let userInfo = {
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, salt),
    };

    created_user = await User.create(userInfo);

    res.status(201).json({ status: "ok", message: "สมัครสมาชิกสำเร็จ" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error!");
  }
};

exports.getAllUser = async (req, res) => {
  const user = await User.findAll({});
  res.status(200).send(user);
};

exports.editUser = async (req, res) => {
  try {
    let userInfo = {
      username: req.body.username,
      user_description: req.body.description,
    };

    update_user = await User.update(userInfo, {
      where: { user_id: req.params.id },
    });

    let user = await User.findAll({ where: { user_id: req.params.id } });
    res.status(201).json({ status: "ok", message: "อัพเดทสำเร็จ", user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
