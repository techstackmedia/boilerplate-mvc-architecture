import Joi from "joi";

const signupValidation = data => {
  const schema = Joi.object({
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).required(),
  });
  return schema.validate(data);
  // schema.validate(req.body);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).required(),
  });
  return schema.validate(data);
};

export { signupValidation, loginValidation };