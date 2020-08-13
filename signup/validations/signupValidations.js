const Joi = require('@hapi/joi');


const schema = Joi.object({
    Userid: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    Password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    Email: Joi.string().email().required()

})


module.exports=schema;