import jwt from "jsonwebtoken";
import { promisify } from "util";
import db from "../model/index.js";
import decodeToken from "../services/decodeToken.js";

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

const handlePassWordChange = (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  if (!newPassword || !confirmPassword) {
    return res.status(400).send("password must be provided");
  }
  if (newPassword !== confirmPassword) {
    res.send("password doesnot match");
  } else {
  }
};

export { isAuthenticated, handlePassWordChange };

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
