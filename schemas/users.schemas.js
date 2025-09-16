const Joi = require('joi');

const id = Joi.string().alphanum().uuid();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(3).max(30);

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  lastName: lastName,
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};

