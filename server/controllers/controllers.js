import bcrypt from "bcryptjs";
import User from "../../database/models/User.js";
import { signupValidation, loginValidation } from "../validations/user.js";

const getUsers = (req, res) => {
  res.send("Hello World");
};

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
      message: "Invalid email or password is not alphanumeric",
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
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid Password or Email" });
  }
};

export { postUserSignup, postUserLogin };
