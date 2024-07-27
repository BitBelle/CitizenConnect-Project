import Joi from "joi";

export const PollSchema = Joi.object({
    userId: Joi.string().required(),
    pollQuestion: Joi.string().required(),
    pollOptions: Joi.array().items(Joi.string().required()).min(1).required(),
    pollStatus: Joi.string().required()
});
