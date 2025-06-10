'use server'

import { createClient } from '../../lib/supabase/server'
import { redirectAndRevalidateCache } from '../../utils/helpers'
import { z } from 'zod/v4'

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export async function login(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  console.log(formData)
  const { error } = await supabase.auth.signInWithPassword(LoginSchema.parse(data))

  if (error) return { error: error.message }

  redirectAndRevalidateCache('/', '/', 'layout')
  return { success: true }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(LoginSchema.parse(data))

  if (error) return { error: error.message }

  redirectAndRevalidateCache('/', '/', 'layout')
  return { success: true }
}
