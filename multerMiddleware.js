import express from "express";
import multer from "multer";

const storage = multer.storage({
  destionation: function (req, file, cb) {
    cb(null, "/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.filename);
  },
});

export { storage, multer };
