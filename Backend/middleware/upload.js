const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "n_cover") {
      cb(null, "uploads/coverNews");
    } else {
      cb(null, "uploads/avatar");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    //path.extname get the uploaded file extension
  },
});
const multerFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|JPG|PNG|JPEG/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));

  if (mimeType && extname) {
    return cb(null, true);
  }
  cb("Please upload a Image");
};

// upload Avater
exports.uploadAvatarMiddleware = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("user_img");

// upload CoverNews
exports.uploadCoverNewsMiddleware = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("n_cover");
//---------------------------------------------------------------------------------------------------

// MiddleWare Upload Mods
const storageMods = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "m_file") {
      cb(null, "uploads/modsFiles");
    } else if (file.fieldname === "m_img1") {
      cb(null, "uploads/modsImage");
    } else if (file.fieldname === "m_img2") {
      cb(null, "uploads/modsImage");
    } else if (file.fieldname === "m_img3") {
      cb(null, "uploads/modsImage");
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "m_file") {
      cb(null, file.originalname);
    } else {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  },
});

const FileModFilter = (req, file, cb) => {
  if (file.fieldname === "m_file") {
    // const fileTypes = /zip|rar|RAR|ZIP/;
    // const mimeType = fileTypes.test(file.mimetype);
    // if (mimeType) {
    //   return cb(null, true);
    // }
    // cb("กรุณาอัปโหลดไฟล์ MOD");
    cb(null, true);
  } else {
    const fileTypes = /jpeg|jpg|png|gif|JPG|PNG|JPEG/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("กรุณาอัปโหลดรูปภาพ");
  }
};

// upload Mods
exports.uploadModMiddleware = multer({
  storage: storageMods,
  fileFilter: FileModFilter,
}).fields([
  {
    name: "m_file",
    maxCount: 1,
  },
  {
    name: "m_img1",
    maxCount: 1,
  },
  {
    name: "m_img2",
    maxCount: 1,
  },
  {
    name: "m_img3",
    maxCount: 1,
  },
]);
