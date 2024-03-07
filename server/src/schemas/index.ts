import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const goalSchema = Joi.object({
  goalName: Joi.string().min(2).required(),
  description: Joi.string().min(2).optional(),
  dueDate: Joi.when("repeatType", {
    is: Joi.string().valid("none"),
    then: Joi.string()
      .required()
      .regex(/^\d{4}-\d{2}-\d{2}$/),
    otherwise: Joi.string().valid("none").required(),
  }),
  repeatType: Joi.string().valid("daily", "weekly", "weekdays", "weekends", "none").required(),
  repeatDay: Joi.when("repeatType", {
    is: Joi.string().valid("none"),
    then: Joi.string().valid("none").required(),
  })
    .when("repeatType", {
      is: Joi.string().valid("daily"),
      then: Joi.array().items(Joi.number().valid(0, 1, 2, 3, 4, 5, 6)).length(7).required(),
    })
    .when("repeatType", {
      is: Joi.string().valid("weekly"),
      then: Joi.array().items(Joi.number().valid(0, 1, 2, 3, 4, 5, 6)).length(1).required(),
    })
    .when("repeatType", {
      is: Joi.string().valid("weekdays"),
      then: Joi.array().items(Joi.number().valid(1, 2, 3, 4, 5)).length(5).required(),
    })
    .when("repeatType", {
      is: Joi.string().valid("weekends"),
      then: Joi.array().items(Joi.number().valid(0, 6)).length(2).required(),
    }),
});
