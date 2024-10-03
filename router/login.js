import { Router } from "express";
import db from "../model/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";
config();

const loginRouter = Router();
loginRouter.route("/").get((req, res, next) => {
  res.render("login");
});

loginRouter.route("/").post(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Please enter both email and password" });
  } else {
    let result = await db.users.findAll({ where: { email: email } });
    if (result.length > 0) {
      const isMatch = bcrypt.compareSync(password, result[0].password);
      if (isMatch) {
        //here we will add jsonwebtoken//generate token here
        const token = jwt.sign({ id: result[0].id }, process.env.SECRETKEY, {
          expiresIn: "30d",
        });
        res.cookie("token", token);
        // res.send("login successful");
        res.redirect("/");
      } else {
        res.send("invalid email or password");
      }
    } else {
      res.send("invalid email or password");
    }
  }
});
export default loginRouter;
