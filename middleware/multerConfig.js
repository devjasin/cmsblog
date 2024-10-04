import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //logic to validate the fileType(mimetype)
    const allowedFilesTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/webp",
    ];
    if (!allowedFilesTypes.includes(file.mimetype)) {
      cb(new Error("File type not allowed"));
      return;
    }
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export { multer, storage };
//cb(error)
//cb(A,b) success
