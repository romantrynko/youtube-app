import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express'
import { findUserByEmail } from '../user/user.service';
import { signJwt } from './auth.utils';
import omit from '../../helpers/omit';
import { LoginBody } from './auth.schema';

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
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
  const payload = omit(user.toJSON(), ['password']);

  const jwt = signJwt(payload);

  // add a cookie to the response
  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false
  })

  // respond
  return res.status(StatusCodes.OK).send(jwt)
}