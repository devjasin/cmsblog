import { Router } from "express";
import db from "../model/index.js";
import { where } from "sequelize";
import {
  createBlog,
  deleteBlog,
  editBlog,
  renderAllBlogs,
  renderCreateBlog,
  renderEditBlog,
  renderSinglePost,
} from "../controller/blog/blogController.js";

const firstrouter = Router();
//display all blog in page
firstrouter.route("/").get(renderAllBlogs);
//create blog
firstrouter.route("/createblog").get(renderCreateBlog).post(createBlog);
//find and display
firstrouter.route("/singlePost/:id").get(renderSinglePost);
//delete page
firstrouter.route("/delete/:id").post(deleteBlog);
//EDIT
firstrouter.route("/edit/:id").post(renderEditBlog);
firstrouter.route("/editBlog1/:id").post(editBlog);

export default firstrouter;
