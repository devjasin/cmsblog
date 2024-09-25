import { Router } from "express";
import db from "../model/index.js";

const firstrouter = Router();
firstrouter.route("/").get(async (req, res) => {
  //database bata vayejati sabai data nikalna
  const allBlogs = await db.blogs.findAll();
  res.render("blog", { blogs: allBlogs }); //passing value for blog.ejs with name blogs j rakhda pani hunxa name
});
firstrouter
  .route("/createblog")
  .get((req, res) => {
    res.render("createBlog");
  })
  .post(async (req, res) => {
    console.log(req.body);
    const { title, subtitle, description } = req.body;
    await db.blogs.create({
      title: title,
      subTitle: subtitle,
      description: description,
    });
    res.redirect("/");
  });

export default firstrouter;
