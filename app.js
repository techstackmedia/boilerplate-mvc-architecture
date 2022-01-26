import express from "express";
import morgan from "morgan";
import dbUrl from "./database/config/config.js";
import routes from "./server/routes/routes.js";

dbUrl;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/users", routes);

export default app;
