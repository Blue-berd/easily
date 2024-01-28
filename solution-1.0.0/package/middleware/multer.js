import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/resume");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix +"." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({ storage: storageConfig });
export default upload;
