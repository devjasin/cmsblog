import express, { Router } from "express";
import {
  forGetPasswordGet,
  forgotPasswordForm,
  ForgotpasswordGet,
  handlePassWordChange,
  verifyOtpGet,
  verifyOtpPost,
} from "../middleware/isAuthenticated.js";

const Forgotpassword = Router();

Forgotpassword.route("/").get(ForgotpasswordGet).post(forgotPasswordForm);

Forgotpassword.route("/otp").get(verifyOtpGet);
Forgotpassword.route("/otp/:id").post(verifyOtpPost);
Forgotpassword.route("/passwordchange")
  .get(forGetPasswordGet)
  .post(handlePassWordChange);

export { Forgotpassword };
