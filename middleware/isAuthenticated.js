import jwt from "jsonwebtoken";
import { promisify } from "util";
import db from "../model/index.js";
import decodeToken from "../services/decodeToken.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import sendEmail from "../services/sendEmail.js";
import { NOTFOUND } from "dns";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  //check it token given or not
  if (!token) {
    // return res.send("token mus be provide");
    return res.redirect("/login");
  }
  //verify token if its legit or not
  const decodedResult = await decodeToken(token, process.env.SECRETKEY);
  //check if that id(user) is existing or not in our user database
  const userExist = await db.users.findAll({ where: { id: decodedResult.id } });
  if (userExist.length === 0) {
    res.send("user doesnot exit");
  } else {
    req.user = userExist;
    req.userId = userExist[0].id;
    next();
  }
};
const forgotPasswordForm = async (req, res) => {
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
      // res.send("user with that email doesnot exist");
      req.flash("notfound", "This Email Id Dose Not Belong With Any User");
      res.redirect("/forgotpassword");
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
    console.log("error during fetching data" + error);
  }
};
const ForgotpasswordGet = (req, res) => {
  const notfound = req.flash("notfound");
  res.render("forgotpassword", { notfound });
};
const verifyOtpGet = (req, res) => {
  const email = req.query.email;
  const iotp = req.flash("iotp");
  res.render("verifyOTP", { email, iotp });
};
const verifyOtpPost = async (req, res) => {
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
  if (doesExist.length > 0) {
    const currentUserTime = Date.now();
    const otpgenerateTime = doesExist[0].otpgenerateTime;
    if (currentUserTime - otpgenerateTime <= 120000) {
      /*   emailExists[0].otp = null;
      emailExists[0].otpgenerateTime = null;
      await emailExists[0].save(); */
      // res.cookie("teset".email)
      // res.redirect("/forgotpassword/passwordchange?email=" + email);
      res.redirect(`/forgotpassword/passwordchange?email=${email}&otp=${otp}`);
    } else {
      res.send("otp has expired");
    }
    //1second=12000 milisecond
  } else {
    req.flash("iotp", "invalid otp");
    res.redirect(`/forgotpassword/otp?email=${email}`);
  }
};
const forGetPasswordGet = (req, res) => {
  const email = req.query.email;
  const otp = req.query.otp;
  if (!email || !otp) {
    res.redirect("/login");
    return;
  }
  res.render("passwordchange", { email, otp });
};
const handlePassWordChange = async (req, res) => {
  // req.cookies.teste
  const { newPassword, confirmPassword } = req.body;
  const email = req.query.email;
  const otp = req.query.otp;
  if (!newPassword || !confirmPassword || !email) {
    return res.status(400).send("password must be provided");
  }
  if (newPassword !== confirmPassword) {
    res.send("new password and confirm password must be match");
  } else {
    /*    const userData= db.users.findAll({ where: { email: email } });
    userData[0].password=newPassword
    await userData[0].save()
 */
    try {
      const dotp = await db.users.findAll({
        where: { email: email, otp: otp },
      });
      if (dotp[0].otp !== otp) {
        res.send("invalid otp");
        return;
      } else {
        const currentUserTime = Date.now();
        const otpgenerateTime = dotp[0].otpgenerateTime;
        if (currentUserTime - otpgenerateTime <= 240000) {
          await db.users.update(
            { password: bcrypt.hashSync(newPassword) },
            { where: { email: email } }
          );
          res.redirect("/login");
        } else {
          res.send("otp has expired");
        }
      }
    } catch (error) {
      res.send("invalid input");
      console.log("invalid input please try agian");
    }
  }
};

export {
  isAuthenticated,
  handlePassWordChange,
  forgotPasswordForm,
  ForgotpasswordGet,
  verifyOtpGet,
  verifyOtpPost,
  forGetPasswordGet,
};

/* here promisify handle (error,decode section),with out this it look like 

(jwt.verify)(token,process.env.secretkey,(error,decode)=>{
if(error){
res.send("error occured")
}else{
res.send("eveything is done good")

}


}) */

/* 
|| userExist[0].id
*/
