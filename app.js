import express from "express";
import firstrouter from "./router/1strouter.js";
import db from "./model/index.js";
import register from "./router/registerRoute.js";
import { config } from "dotenv";

const app = express();
config();
let port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running good at ${port} `);
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", firstrouter);
app.use("/register", register);
