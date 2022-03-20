import express from "express";
import cakesRouter from "./cakesRouter.js";

const router = express.Router();

router.use(cakesRouter);


export default router;