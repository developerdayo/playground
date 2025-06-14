import { QueryProvider } from "@/app/providers"
import { UserProfileInner, UserProfileProps } from "./UserProfileInner"


export const UserProfile = ({user, profile}: UserProfileProps) => {
  return (
    <QueryProvider>
      <UserProfileInner user={user} profile={profile} />
    </QueryProvider>
  )
}