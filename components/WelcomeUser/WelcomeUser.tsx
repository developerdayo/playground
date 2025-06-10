import { createClient } from "@lib/supabase/server"

export const WelcomeUser = async () => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const userEmail = data.user?.email

  return <p>Welcome {userEmail}</p>
}