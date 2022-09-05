import { object, string, TypeOf } from 'zod';

export const loginSchema = {
  body: object({
    email: string({
      required_error: 'email is required'
    }).email('not valid email'),
    password: string({
      required_error: 'password is required'
    }).min(6, 'password min 6 characters').max(64, 'max length 64 characters'),
  }),
}

export type LoginBody = TypeOf<typeof loginSchema.body>