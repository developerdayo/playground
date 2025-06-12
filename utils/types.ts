export type ProfileType = {
  first_name: string | null
  last_name: string | null
  user_id: string
  is_disabled: boolean
}

export type UserType = {
  first_name: string
  last_name: string
  email?: string
}