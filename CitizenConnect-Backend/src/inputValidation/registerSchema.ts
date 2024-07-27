import Joi from 'joi'


export const RegisterSchema = Joi.object({

    // userImg:Joi.string().required(),
    userName:Joi.string().required(),
    userEmail:Joi.string().required().email(),
    roleName:Joi.string().required(),
    upassword:Joi.string().required().pattern(
        new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    ),
    termsAccepted: Joi.boolean().required()
        
})


