import { where } from "sequelize";
import db from "../../model/index.js";
import fs from "fs";
const renderCreateBlog = (req, res) => {
  res.render("createBlog");
};

const createBlog = async (req, res) => {
  console.log(req.user[0].id, "userId from createBlog"); //req.user.id isAuthentication bata pathayeko huxna
  const userId = req.user[0].id;
  const { title, subtitle, description } = req.body;
  const fileName = req.file.filename;
  if (!title || !subtitle || !description || !fileName) {
    return res.send("you must be filled all data");
  }
  await db.blogs.create({
    title: title,
    subTitle: subtitle,
    description: description,
    userId: userId,
    image: process.env.PROJECT_URI + fileName,
  });
  res.redirect("/");
};

const renderAllBlogs = async (req, res) => {
  const allBlogs = await db.blogs.findAll({
    include: { model: db.users },
  });
  await res.render("blog", { blogs: allBlogs }); //passing value for blog.ejs with name blogs j rakhda pani hunxa name
};

const renderSinglePost = async (req, res) => {
  let id = req.params.id;
  const aaide = await db.blogs.findAll({
    where: {
      id: id,
    },
    include: { model: db.users },
  });
  //alternative method
  // const db.blog=await db.blogs.findByPk(id)
  // res.json(aaide);

  res.render("singleBlog", { sdata: aaide });
};

const deleteBlog = async (req, res) => {
  let id = req.params.id;
  const data = await db.blogs.findAll({ where: { id: id } });
  const oldImagePath = data[0].image.slice(22);
  await db.blogs.destroy({
    where: {
      id: id,
    },
  });
  fs.unlink(`uploads/${oldImagePath}`, (error) => {
    if (error) {
      console.log("error happen :", error);
    } else {
      console.log("file deleted");
    }
  });

  res.redirect("/");
};

const renderEditBlog = async (req, res) => {
  const id = req.params.id;
  //find blog of that id
  const data = await db.blogs.findAll({ where: { id: id } });
  //this will fill the data
  res.render("editBlog", { data: data });
};

const editBlog = async (req, res) => {
  let id = req.params.id;
  const { title, subtitle, description } = req.body;
  const oldDatas = await db.blogs.findAll({ where: { id: id } });
  let fileUrl;
  if (req.file) {
    const fileName = req.file.filename;
    fileUrl = process.env.PROJECT_URI + fileName;
    const oldImagePath = oldDatas[0].image.slice(22);
    //for delete old image ↓↓↓↓↓→←
    fs.unlink(`uploads/${oldImagePath}`, (error) => {
      if (error) {
        console.log("error happen :", error);
      } else {
        console.log("file deleted");
      }
    });
  } else {
    fileUrl = oldDatas[0].image;
  }
  await db.blogs.update(
    {
      title: title,
      subTitle: subtitle,
      description: description,
      image: fileUrl,
    },
    {
      where: {
        id: id,
      },
    }
  );

  res.redirect("/singlePost/" + id);
};

const Myblog = async (req, res) => {
  //get this user blogs
  const id = await req.user[0].id;
  const userBlogOnly = await db.blogs.findAll({
    where: { userId: id },
  });
  // res.json(userBlogOnly);
  res.render("myBlog.ejs", { blogs: userBlogOnly });
};

export {
  renderCreateBlog,
  createBlog,
  renderAllBlogs,
  renderSinglePost,
  deleteBlog,
  renderEditBlog,
  editBlog,
  Myblog,
};
