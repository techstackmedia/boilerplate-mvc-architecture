import jwt from "jsonwebtoken";

const authVerification = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access denied");
  } else {
    try {
      const verified = jwt.verify(token, process.env.SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).send("Invalid Token");
    }
  }
};

const _protected = authVerification;

export default _protected;
