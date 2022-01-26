import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";
import { signupValidation, loginValidation } from "../validations/user.js";

const postUserSignup = async (req, res) => {
  const { error } = signupValidation(req.body);
  const emailExist = await User.findOne({ email: req.body.email });

  if (error) {
    return res
      .status(400)
      .json({ status: "fail", message: error.details[0].message });
  } else if (emailExist) {
    return res.status(400).json({
      status: "fail",
      message: "Unauthorized access, please check your email or password",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.json({ status: "success", data: user });
  }
};

const postUserLogin = async (req, res) => {
  const { error } = loginValidation(req.body);
  const user = await User.findOne({ email: req.body.email });
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (error) {
    return res.status(400).send(error.details[0].message);
  } else if (!user) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid Password or Email" });
  } else if (!validPass) {
    return res.status(400).send("invalid password or email");
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.header("auth-token", token).send(token);
};

const getPosts = (req, res) => {
  // res.json({
  //   posts: {
  //     title: "My first post",
  //     description: "This is a post I made",
  //   },
  // });
  // User.findById({ _id: req.user });
  res.send(req.user);
};

export { postUserSignup, postUserLogin, getPosts };
