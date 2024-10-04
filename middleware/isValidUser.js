import db from "../model/index.js";

const isValidUser = async (req, res, next) => {
  const userId = req.user[0].id;
  const id = req.params.id;
  const data = await db.blogs.findAll({ where: { id: id } });
  if (data[0].userId !== userId) {
    return res.send("you are not authorized");
  }
  next();
};

export default isValidUser;
