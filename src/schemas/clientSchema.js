import joi from 'joi';

const clientSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]+$/).min(10).max(11)
});

export default clientSchema;