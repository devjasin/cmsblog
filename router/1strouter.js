import { Router } from "express";
import db from "../model/index.js";
import { where } from "sequelize";

import { multer, storage } from "../middleware/multerConfig.js";

import {
  createBlog,
  deleteBlog,
  editBlog,
  Myblog,
  renderAllBlogs,
  renderCreateBlog,
  renderEditBlog,
  renderSinglePost,
} from "../controller/blog/blogController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const firstrouter = Router();
//display all blog in page
firstrouter.route("/").get(renderAllBlogs);
//create blog
const upload = multer({ storage: storage });
firstrouter
  .route("/createblog")
  .get(renderCreateBlog)
  .post(isAuthenticated, upload.single("image"), createBlog);
//upload.single('image') is for multer middleware
//find and display
firstrouter.route("/singlePost/:id").get(renderSinglePost);
//delete page
firstrouter.route("/delete/:id").post(isAuthenticated, deleteBlog);
//EDIT
firstrouter.route("/edit/:id").post(isAuthenticated, renderEditBlog);
firstrouter.route("/editBlog1/:id").post(isAuthenticated, editBlog);
firstrouter.route("/myblogs").get(isAuthenticated, Myblog);

export default firstrouter;
