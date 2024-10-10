import express from "express";
import firstrouter from "./router/1strouter.js";
import db from "./model/index.js";
import register from "./router/registerRoute.js";
import { config } from "dotenv";
import loginRouter from "./router/login.js";
import cookieParser from "cookie-parser";
import { Forgotpassword } from "./router/forgotpassword.js";
import decodeToken from "./services/decodeToken.js";
import session from "express-session";
import flash from "connect-flash/lib/flash.js";

const app = express();
config();
app.set("view engine", "ejs");
app.use(
  session({
    secret: "thisissecretkey",
    resave: false, //if nothing has change it does not save it self
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const decoded = await decodeToken(token, process.env.SECRETKEY);
    if (decoded && decoded.id) {
      res.locals.currentUserId = decoded.id;
    }
  }
  res.locals.currentUser = req.cookies.token;

  next();
});
app.use("/", firstrouter);
app.use("/register", register);
app.use("/login", loginRouter);
app.use("/forgotpassword", Forgotpassword);

app.listen(process.env.PORT, () => {
  console.log(`server is running good at ${process.env.PORT} `);
});
