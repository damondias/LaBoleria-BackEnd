import express from 'express';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';
import clientSchema from '../schemas/clientSchema.js';
import { postClients, getOrdersByClients } from '../controllers/clientsController.js';

const clientsRouter = express.Router();

clientsRouter.post('/clients', validateSchemasMiddleware(clientSchema), postClients);
clientsRouter.get('/clients/:id/orders', getOrdersByClients);

export default clientsRouter;