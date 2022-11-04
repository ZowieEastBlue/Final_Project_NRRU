const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// const jsonParser = bodyParser.json();
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const jwt = require("jsonwebtoken");
// const secret = "Fullstack-Login-2021";

const db = require("./models");
const { readdirSync } = require("fs");
// เขื่อมต่อ Database
// const connection = require("./config/db");
// const mysql = require("mysql2");
// create the connection to database
// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   database: process.env.DATABASE,
// });

//ใส่ไว้ก่อน
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//--------------------------------------------------------------------------------------------------------------
// middleware
app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));

//static Images Folder
app.use("/uploads", express.static("./uploads"));
app.use("/uploads", express.static("./uploads/avatar"));
app.use("/uploads", express.static("./uploads/modsimage"));
app.use("/uploads", express.static("./uploads/modsFiles"));
app.use("/uploads", express.static("./uploads/coverNews"));

// Route
// http://localhost:5000/api/
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// test api

app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});

// USE PORT FOR RUN SERVER
app.listen(5000, function () {
  console.log("CORS-enable on port 5000");
});
