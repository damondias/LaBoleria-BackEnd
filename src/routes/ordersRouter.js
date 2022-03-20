import express from 'express';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';
import orderSchema from '../schemas/orderSchema.js';
import { postOrders } from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.post('/order', validateSchemasMiddleware(orderSchema), postOrders);

export default ordersRouter;