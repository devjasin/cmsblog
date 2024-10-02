import { Sequelize, DataTypes } from "sequelize";

import blogModel from "./blogModel.js";
import dbConfig from "../controller/dbconfig/dbConfig.js";
import userModel from "./userModel.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  //for railway
  port: 3306,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};
db.blogs = blogModel(sequelize, DataTypes);
db.users = userModel(sequelize, DataTypes);
// db.users = user(sequelize, DataTypes);// db.user stand for databsae = user vaneko model vitra ko file name
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

export default db;
