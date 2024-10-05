import express, { Router } from "express";
import db from "../model/index.js";
import sendEmail from "../services/sendEmail.js";

const Forgotpassword = Router();

Forgotpassword.route("/")
  .get((req, res) => {
    res.render("forgotpassword");
  })
  .post(async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ message: "bad request" });
      }
      const emailExists = await db.users.findAll({
        where: {
          email: email,
        },
      });
      if (emailExists.length === 0) {
        res.send("user with that email doesnot exist");
      } else {
        //send opt on that email
        await sendEmail({
          email: email,
          subject: "reset password",
          otp: 1234,
        });
        res.send("email send successfully");
      }
    } catch (error) {
      console.log("error during");
    }
  });

export default Forgotpassword;
