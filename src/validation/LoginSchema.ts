import Joi from "joi";

export const LoginSchema = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            'string.required': 'Username is required',
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.required': 'Password is required',
        }),
});