import Joi from "joi-browser";

    const schema = {
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).label('Email'),
        // name: Joi.string()
        //         .alphanum()
        //         .min(3)
        //         .max(30)
        //         .required(),
        // lacation: Joi.object().keys({
        //     address: Joi.string().required(),
        //     city: Joi.string().required(),
        //     state: Joi.string().required(),
        //     zipcode: Joi.string().required(),
        //     country: Joi.string(),required()
        
        // })
    };

export default schema;