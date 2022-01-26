import dotenv from "dotenv";
import mongoose from "mongoose";
import debug from "debug";

const db = debug("app:db");

dotenv.config({ path: "./bin/.env" });

const database = async dbUrl => {
  try {
    await dbUrl;
    db("Database, mongoose connected to server...");
  } catch (err) {
    db(`Database, mongoose unable to connect server ${err}`);
  }
};

const url = mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.n5uqo.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
);

database(url);

export default database;
