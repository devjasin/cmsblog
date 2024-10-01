import { Router } from "express";
import { renderRegisterUser } from "../controller/blog/userControl.js";

const register = Router();
register
  .route("/")
  .get(renderRegisterUser)
  .post((req, res, next) => {
    res.send("success");
  });

export default register;
