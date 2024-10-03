import express from "express";
import firstrouter from "./router/1strouter.js";
import db from "./model/index.js";
import register from "./router/registerRoute.js";
import { config } from "dotenv";
import loginRouter from "./router/login.js";
import cookieParser from "cookie-parser";

const app = express();
config();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", firstrouter);
app.use("/register", register);
app.use("/login", loginRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running good at ${process.env.PORT} `);
});
