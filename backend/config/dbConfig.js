import dotenv from "dotenv";
dotenv.config();

export default {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DATABASE,
  dialect: process.env.DIALECT,
  PORT: process.env.DB_PORT,
};
