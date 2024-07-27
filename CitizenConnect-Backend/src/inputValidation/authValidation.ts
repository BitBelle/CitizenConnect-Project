import Joi from "joi";

export const UserSchema = Joi.object(

    {
        userEmail: Joi.string().required(),
        upassword: Joi.string().required()
    }

)