import { Router } from "express";
import db from "../model/index.js";
import { where } from "sequelize";

const firstrouter = Router();
firstrouter.route("/").get(async (req, res) => {
  //database bata vayejati sabai data nikalna
  const allBlogs = await db.blogs.findAll();
  // res.json(allBlogs);
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

firstrouter.route("/singlePost/:id").get(async (req, res) => {
  let id = req.params.id;
  const aaide = await db.blogs.findAll({
    where: {
      id: id,
    },
  });
  //alternative method
  // const db.blog=await db.blogs.findByPk(id)
  // res.json(aaide);

  res.render("singleBlog", { sdata: aaide });
});
//delete page
firstrouter.route("/delete/:id").post(async (req, res) => {
  let id = req.params.id;
  await db.blogs.destroy({
    where: {
      id: id,
    },
  });
  res.redirect("/");
});
//EDIT
firstrouter.route("/edit/:id").post(async (req, res) => {
  const id = req.params.id;
  //find blog of that id
  const data = await db.blogs.findAll({ where: { id: id } });
  //this will fill the data
  res.render("editBlog", { data: data });
});
firstrouter.route("/editBlog1/:id").post(async (req, res) => {
  let id = req.params.id;
  const { title, subtitle, description } = req.body;
  await db.blogs.update(
    {
      title: title,
      subTitle: subtitle,
      description: description,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.redirect("/singlePost/" + id);
});

export default firstrouter;
