import Joi from 'joi';

export const PollSchema = Joi.object({
    pollQuestion: Joi.string().required(),
    pollOptions: Joi.array().items(Joi.object({
        // optionId: Joi.string().required(),
        optionText: Joi.string().required()
    }).required()).min(1).required(),
    pollStatus: Joi.string().valid('active', 'inactive').required()
});
