import { createClient } from '@lib/supabase/server'
import { redirectAndRevalidateCache } from '@utils/helpers'

export async function GET() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) console.error('Error signing out:', error)

  redirectAndRevalidateCache('/login', '/login', 'layout')
}