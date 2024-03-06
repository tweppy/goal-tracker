import Joi from "joi";

export const createGoalSchema = Joi.object({
  userId: Joi.string().required(),
  goalName: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  dueDate: Joi.string().optional(),
  repeatType: Joi.string().valid("daily", "weekly", "weekdays", "weekends", "none").required(),
  repeatDay: Joi.array().items(Joi.number()).optional(),
});