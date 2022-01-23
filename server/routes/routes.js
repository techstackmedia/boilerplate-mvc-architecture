import express from "express";
import { postUserSignup, postUserLogin } from "../controllers/controllers.js";

const router = express.Router();

router.post("/signup", postUserSignup);
router.post("/login", postUserLogin);

export default router;
