import { Router } from "express";
import {
  RegisterUser,
  renderRegisterUser,
} from "../controller/blog/userControl.js";

const register = Router();
register.route("/").get(renderRegisterUser).post(RegisterUser);

export default register;
