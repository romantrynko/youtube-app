import { object, string, TypeOf } from 'zod';

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: "username is required",
    }),
    email: string({
      required_error: "email is required",
    }),
    password: string({
      required_error: "password is required",
    }).min(6, "Password must be at least 6 characters long").max(64, "max 64 characters"),
    confirmPassword: string({
      required_error: "password is required",
    })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["Confirm password"],
  }),
  // params: {}
}

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>