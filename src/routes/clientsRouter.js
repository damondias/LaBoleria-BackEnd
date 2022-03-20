import express from 'express';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';
import clientSchema from '../schemas/clientSchema.js';
import { postClients } from '../controllers/clientsController.js';

const clientsRouter = express.Router();

clientsRouter.post('/clients', validateSchemasMiddleware(clientSchema), postClients);

export default clientsRouter;