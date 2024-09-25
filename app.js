import express from "express";
import firstrouter from "./router/1strouter.js";
// import db from "./model/index.js";

const app = express();
app.listen(3000, () => {
  console.log("server is running good at 3000");
});
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(firstrouter);
