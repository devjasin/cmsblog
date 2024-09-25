import { Router } from "express";
import db from "../model/index.js";

const firstrouter = Router();
firstrouter.route("/").get((req, res) => {
  res.render("blog");
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
  });

export default firstrouter;
