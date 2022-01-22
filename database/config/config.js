import dotenv from "dotenv";
import mongoose from "mongoose";
import debug from "debug";

dotenv.config({ path: "./bin/.env" });

const db = debug("app:db");
const uri = mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.n5uqo.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => db("Database, mongoose connected to server..."))
  .catch((err) => db(`Database, mongoose unable to connect server ${err}`));

export default uri;
