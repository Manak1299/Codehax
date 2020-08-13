const Joi = require('@hapi/joi');


const schema = Joi.object({

    Password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})


module.exports=schema;