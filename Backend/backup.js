const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
// const jsonParser = bodyParser.json()
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "Fullstack-Login-2021";
const { readdirSync } = require("fs");
// เขื่อมต่อ Database
const connection = require("./config/db");
// const mysql = require("mysql2");
// create the connection to database
// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   database: process.env.DATABASE,
// });

// middleware
app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));

// Route
// http://localhost:5000/api/
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// API REGISTER WAY
app.post("/register", function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      "INSERT INTO tb_user (email, username, password) VALUES (?, ?, ?)",
      [req.body.email, req.body.username, hash],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
      }
    );
  });
});

// API LOGIN WAY
app.post("/login", function (req, res, next) {
  connection.execute(
    "SELECT * FROM tb_user WHERE email=?",
    [req.body.email],
    function (err, user, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (user.length == 0) {
        res.json({ status: "error", message: "no user found" });
        return;
      }
      bcrypt.compare(
        req.body.password,
        user[0].password,
        function (err, isLogin) {
          if (isLogin) {
            UserLevel = {
              type: user[0].user_level,
              email: user[0].email,
              username: user[0].username,
            };
            token = jwt.sign({ email: user[0].email }, secret, {
              expiresIn: "8h",
            });
            res.json({
              status: "ok",
              message: "login success",
              token,
              UserLevel,
            });
          } else {
            res.json({ status: "error", message: "login filed" });
          }
        }
      );
    }
  );
});

// AUTH TOKEN
app.post("/authen", function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

// ---------------------------------------------------------------------------------------------
app.get("/selectThemes", async (req, res, next) => {
  try {
    connection.query("SELECT * FROM tb_theme", (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

app.get("/selectCategory", async (req, res, next) => {
  try {
    connection.query(
      `
        WITH RECURSIVE category_path (id, title, path) AS
        (
          SELECT id, title, title as path
            FROM category
            WHERE parent_id IS NULL
          UNION ALL
          SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)
            FROM category_path AS cp JOIN category AS c
              ON cp.id = c.parent_id
        )
        SELECT * FROM category_path
        ORDER BY path;
        `,
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

app.post("/uploadmods", (req, res, next) => {
  connection.execute(
    "INSERT INTO download (title, description, themeID, categoryID) VALUES (?, ?, ?, ?)",
    [
      req.body.title,
      req.body.description,
      req.body.themeID,
      req.body.categoryID,
    ],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

// USE PORT FOR RUN SERVER
app.listen(5000, function () {
  console.log("CORS-enable on port 5000");
});
