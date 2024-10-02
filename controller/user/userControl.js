import db from "../../model/index.js";
import bcrypt from "bcryptjs";

const renderRegisterUser = (req, res, next) => {
  res.render("register");
};

const RegisterUser = async (req, res, next) => {
  const { username, email, password } = await req.body;
  const isExists = await db.users.findAll({ where: { email: email } });
  if (isExists.length === 0) {
    db.users.create({
      user: username,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.redirect("/login");
  } else {
    res.send("user is already exists");
  }
};

export { renderRegisterUser, RegisterUser };
