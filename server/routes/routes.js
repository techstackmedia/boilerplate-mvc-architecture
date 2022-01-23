import express from "express";
import _protected from "../../authentication/verifyToken.js";
import {
  postUserSignup,
  postUserLogin,
  getPosts,
} from "../controllers/controllers.js";

const router = express.Router();

router.post("/signup", postUserSignup);
router.post("/login", postUserLogin);
router.get("/", _protected, getPosts);

export default router;
