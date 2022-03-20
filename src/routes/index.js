import express from "express";
import cakesRouter from "./cakesRouter.js";
import clientsRouter from "./clientsRouter.js";

const router = express.Router();

router.use(cakesRouter);
router.use(clientsRouter);


export default router;