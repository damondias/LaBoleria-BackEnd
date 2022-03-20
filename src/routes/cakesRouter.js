import express from 'express';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';
import cakeSchema from '../schemas/cakeSchema.js';
import { postCakes } from '../controllers/cakesController.js';

const cakesRouter = express.Router();

cakesRouter.post('/cakes', validateSchemasMiddleware(cakeSchema), postCakes);

export default cakesRouter;