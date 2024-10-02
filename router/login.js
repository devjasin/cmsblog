import { Router } from "express";
import db from "../model/index.js";
import bcrypt from "bcryptjs";

const loginRouter = Router();
loginRouter.route("/").get((req, res, next) => {
  res.render("login");
});

loginRouter.route("/").post(async (req, res, next) => {
  const { email, password } = req.body;
  let result = await db.users.findAll({ where: { email: email } });
  if (result.length > 0) {
    const isMatch = bcrypt.compareSync(password, result[0].password);
    if (isMatch) {
      res.send("login successful");
    } else {
      res.send("invalid email or password");
    }
  } else {
    res.send("invalid email or password");
  }
});

export default loginRouter;
