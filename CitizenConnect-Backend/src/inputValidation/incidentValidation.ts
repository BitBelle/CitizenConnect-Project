import Joi from "joi";

export const IncidentSchema = Joi.object(

    {
        userId: Joi.string().required(),
        userName: Joi.string().required(),
        incidentImg: Joi.string().required(),
        incidentDesc: Joi.string().required(),

    }

)