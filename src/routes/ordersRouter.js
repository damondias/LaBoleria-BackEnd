import express from 'express';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';
import orderSchema from '../schemas/orderSchema.js';
import { postOrders, getOrders, getOrdersById } from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.post('/order', validateSchemasMiddleware(orderSchema), postOrders);
ordersRouter.get('/orders', getOrders);
ordersRouter.get('/orders/:id', getOrdersById);

export default ordersRouter;