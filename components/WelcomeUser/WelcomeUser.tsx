import { ProfileSchema } from "@/utils/schemas"
import { createClient } from "@lib/supabase/server"

export const WelcomeUser = async () => {
  const supabase = await createClient()
  const { data } = await supabase.from('profiles').select()

  if (data === null || data.length === 0) return

  const userName = ProfileSchema.parse(data[0]).first_name

  return <p>Welcome {userName}!</p>
}