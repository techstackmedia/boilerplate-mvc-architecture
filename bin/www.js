import dotenv from "dotenv";
import app from "../app.js";
import debug from "debug";

const log = debug("app:port");
dotenv.config();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  log(`App up and running at port ${port}`);
});
