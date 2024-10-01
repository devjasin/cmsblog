import db from "../../model/index.js";

const renderCreateBlog = (req, res) => {
  res.render("createBlog");
};

const createBlog = async (req, res) => {
  console.log(req.body);
  const { title, subtitle, description } = req.body;
  await db.blogs.create({
    title: title,
    subTitle: subtitle,
    description: description,
  });
  res.redirect("/");
};

const renderAllBlogs = async (req, res) => {
  const allBlogs = await db.blogs.findAll();
  res.render("blog", { blogs: allBlogs }); //passing value for blog.ejs with name blogs j rakhda pani hunxa name
};

const renderSinglePost = async (req, res) => {
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
};

const deleteBlog = async (req, res) => {
  let id = req.params.id;
  await db.blogs.destroy({
    where: {
      id: id,
    },
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
};

export {
  renderCreateBlog,
  createBlog,
  renderAllBlogs,
  renderSinglePost,
  deleteBlog,
  renderEditBlog,
  editBlog,
};
