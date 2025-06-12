import { createClient } from "../../lib/supabase/server"

import profilePageCss from './profile.module.scss'
import { UserProfile } from "../../components/UserProfile/UserProfile"
import { Suspense } from "react"
import { headers } from "next/headers"
import { HEADER_AUTH } from "@/utils/variables"
import { ProfileSchema } from "@/utils/schemas"

const ProfilePage = async () => {
  const supabase = await createClient()
  const { data: { user: userData }, error: userError } = await supabase.auth.getUser()
  const { data: profileData , error: profileError } = await supabase.from('profiles').select().eq('user_id', userData?.id)
  const headersList = await headers()
  const isUserLoggedIn = headersList.get(HEADER_AUTH)
  const hasError = profileData === null || profileData.length === 0 || userData === null
  const error = userError || profileError
  const errorMessage = error ? error.message : 'Oops, something went wrong. Please try again later.'
  
  return (
    <>
      <div className={profilePageCss['container']}>
        <div className={profilePageCss['header']}>
          <h1>Profile</h1>
        </div>
        {isUserLoggedIn && (
          <Suspense fallback={"Loading..."}>
            {hasError || error
              ? <p>{errorMessage}</p>
              : <UserProfile user={userData} profile={ProfileSchema.parse(profileData[0])} />
            }
          </Suspense>
        )}
      </div>
    </>
  )
}

export default ProfilePage