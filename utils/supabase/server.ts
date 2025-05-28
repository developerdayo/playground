import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { SUPABASE_KEY, SUPABASE_URL } from "../variables"

export const createClient = async () => {
  const cookieStore = await cookies()

  
  return createServerClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookieToSet) {
          try {
            cookieToSet.forEach(({ name, value, options }) => 
              cookieStore.set(name, value, options)
            )
          } catch {
            console.warn('something went wrong while setting cookies')
          }
        },
      },
    }
  )
}