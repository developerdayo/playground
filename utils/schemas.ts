import { z } from 'zod/v4'

export const ErrorSchema = z.object({
  status: z.number(),
  code: z.object(),
  name: z.string(),
  message: z.string(),
  stack: z.string().nullable(),
  cause: z.unknown()
})

export const ProfileSchema = z.object({
  first_name: z.string().min(1).nullable(),
  last_name: z.string().min(1).nullable(),
  is_disabled: z.boolean(),
  user_id: z.uuid()
})

export const UserSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.email()
})

