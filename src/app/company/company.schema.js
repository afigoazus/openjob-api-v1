import Joi from "joi";

export const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
});

export const editCompanySchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  location: Joi.string().optional(),
}).min(1);
