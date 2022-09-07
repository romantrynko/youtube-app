import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserBody } from "./user.schema";
import { createUser } from "./user.service";

export async function registerUserHandler(req: Request<{}, {}, RegisterUserBody>, res: Response) {
  const { username, email, password } = req.body;

  try {
    await createUser({
      username, email, password,
      __v: 0
    });

    return res.status(StatusCodes.CREATED).send('User created');
  } catch (error) {
    if (error.code === 11000) {
      res.status(StatusCodes.CONFLICT).send("User already exists")
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
  }
}