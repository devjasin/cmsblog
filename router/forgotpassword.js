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
        const generateOtp = Math.floor(1000 + Math.random() * 9000);
        await sendEmail({
          email: email,
          subject: "reset password",
          otp: generateOtp,
        });
        emailExists[0].otp = generateOtp;
        emailExists[0].otpgenerateTime = Date.now();
        await emailExists[0].save();
        res.redirect("/forgotpassword/otp?email=" + email);
      }
    } catch (error) {
      console.log("error during");
    }
  });

Forgotpassword.route("/otp").get((req, res) => {
  const email = req.query.email;
  res.render("verifyOTP", { email });
});
Forgotpassword.route("/otp/:id").post(async (req, res) => {
  const { otp } = req.body;
  const email = req.params.id;
  if (!otp || !email) {
    res.status(400).json({ message: " bad request" });
  }
  const doesExist = await db.users.findAll({
    where: {
      otp: otp,
      email: email,
    },
  });
  console.log(doesExist);
  if (doesExist.length > 0) {
    const currentUserTime = Date.now();
    const otpgenerateTime = doesExist[0].otpgenerateTime;
    if (currentUserTime - otpgenerateTime <= 120000) {
      /*   emailExists[0].otp = null;
      emailExists[0].otpgenerateTime = null;
      await emailExists[0].save(); */
      res.redirect("/forgotpassword/passwordchange");
    } else {
      res.send("otp has expired");
    }
    //1second=12000 milisecond
  } else {
    res.status(400).json({ message: " Invalid otp" });
  }
});

Forgotpassword.route("/passwordchange")
  .get((req, res) => {
    res.render("passwordchange");
  })
  .post((req, res) => {
    const { password } = req.body;
  });

export { Forgotpassword };
