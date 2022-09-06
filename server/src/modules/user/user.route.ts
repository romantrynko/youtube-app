import express from "express";
import requireUser from '../../middleware/requireUser';
import { processRequestBody } from "zod-express-middleware";

import { registerUserHandler } from "./user.controller";
import { registerUserSchema } from './user.schema';

const router = express.Router();

router.get('/', requireUser, (req, res) => {
  return res.send(res.locals.user)
})

// /api/users
router.post(
  '/',
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

export default router;
