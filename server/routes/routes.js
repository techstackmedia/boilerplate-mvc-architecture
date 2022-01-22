import express from "express";
import { getUsers, postUser } from "../controllers/controllers.js";
const router = express.Router();

router.route("/").get(getUsers).post(postUser);

export default router;
