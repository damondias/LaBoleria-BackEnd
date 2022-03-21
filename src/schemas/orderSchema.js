import joi from 'joi';

const orderSchema = joi.object({
  clientId: joi.number(),
  cakeId: joi.number(),
  quantity: joi.number().integer().min(1).max(4).required(),
  totalPrice: joi.number().precision(2)
});

export default orderSchema;