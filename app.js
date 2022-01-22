import express from "express";
import morgan from "morgan";
import uri from "./database/config/config.js";
import routes from "./server/routes/routes.js";

uri;

const app = express();

app.use(morgan("dev"));
app.use("/users", routes);

export default app;
