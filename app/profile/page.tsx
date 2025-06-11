import { createClient } from "../../lib/supabase/server"

import profilePageCss from './profile.module.scss'
import { UserProfile } from "../../components/UserProfile/UserProfile"
import { Suspense } from "react"
import { headers } from "next/headers"
import { HEADER_AUTH } from "@/utils/variables"

const ProfilePage = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const headersList = await headers()
  const isUserLoggedIn = headersList.get(HEADER_AUTH)

  
  return (
    <>
      <div className={profilePageCss['container']}>
        <div className={profilePageCss['header']}>
          <h1>Profile</h1>
        </div>
        {isUserLoggedIn && (
          <Suspense fallback={"Loading..."}>
            <UserProfile user={user} />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default ProfilePage