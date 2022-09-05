import { registerUserSchema } from './user.schema';
import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { registerUserHandler } from "./user.controller";

const router = express.Router();

// /api/users
router.post('/', processRequestBody(registerUserSchema.body), registerUserHandler)


export default router