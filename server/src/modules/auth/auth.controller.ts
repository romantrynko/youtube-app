import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express'
import { findUserByEmail } from '../user/user.service';
import { signJwt } from './auth.utils';

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  // find user by email
  const user = await findUserByEmail(email);

  // check user exists - return error
  // verify user email
  if (!user || !user.comparePassword(password)) {
    // if wrong password - return error
    return res.status(StatusCodes.UNAUTHORIZED).send("Invalid email or password")
  }
  
  
  
  // sign a jwt
  const payload = user.toJSON();

  const jwt = signJwt(payload);

  // add a cookie to the response

  // respond
}