//for local
export default {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "blogcms",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

/* export default {
  HOST: "mysql.railway.internal",
  USER: "root",
  PASSWORD: "CbFUyXkEFLfUWQBUvvyWsmTeByLPOscE",
  DB: "railway",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
 */
