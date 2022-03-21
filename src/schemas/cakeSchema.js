import joi from 'joi';

const cakeSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().precision(2).greater(0).required(),
    description: joi.string().allow('').optional(),
    image: joi.string().uri().required()     
});

export default cakeSchema;