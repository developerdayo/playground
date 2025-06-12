'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@lib/supabase/client'
import { z } from 'zod/v4'

import type { ProfileType } from '@/utils/types'
import type { User } from '@supabase/supabase-js'
import { ErrorSchema, ProfileSchema } from '@/utils/schemas'

import { EditableField } from '@components/EditableField/EditableField'

import userProfileCss from './user-profile.module.scss'
import { queue } from '../ToastRegion/ToastRegion'

type UserProfileProps = {
  user: User
  profile: ProfileType
}

const EmailSchema = z.email()

export const UserProfile = ({user, profile}: UserProfileProps) => {
  const [userData, setUserData] = useState<ProfileType>(profile)
  const [error, setError] = useState<null | string>(null)
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null)
  const [isEmailChangePending, setIsEmailChangePending] = useState(!!user.new_email)
  const firstName = userData.first_name || 'N/A'
  const lastName = userData.last_name || 'N/A'
  const searchParams = useSearchParams()

  const handleUpdateProfileData = async (fieldName: string, fieldValue: string) => {
    try {
      const { data, error } = await supabase.from('profiles').update({ [fieldName]: fieldValue }).eq('user_id', user.id).select()
      if (error) throw error
      if (data && data.length > 0) setUserData(ProfileSchema.parse(data[0]))
    } catch (error) {
      setError(ErrorSchema.parse(error).message)
    }
}

const handleUpdateEmail = async (fieldName: string, fieldValue: string) => {
  try {
    EmailSchema.parse(fieldValue)
    const { data, error } = await supabase.auth.updateUser({ [fieldName]: fieldValue }, { emailRedirectTo: 'http://localhost:3000/profile?redirectSource=emailChange' })
    if (error) throw error
    if (data) setConfirmationMessage(`Please finalize the email change via the confirmation emails sent to the current email: ${user.email} and the new email: ${fieldValue}`)
    data.user.new_email ? setIsEmailChangePending(true) : setIsEmailChangePending(false)
    setError(null)
    } catch (error) {
      setError(ErrorSchema.parse(error).message)
    }
  }

  useEffect(() => {
    if (error) queue.add({ title: 'Error', description: error })
    if ((!searchParams.has('message') && searchParams.get('redirectSource') === 'emailChange')) queue.add({ title: 'Success', description: 'Your email was successfully updated.' })
    if ((searchParams.has('message') && searchParams.get('redirectSource') === 'emailChange')) queue.add({ title: 'Success', description: z.string().parse(searchParams.get('message'))})
    if (confirmationMessage) queue.add({ title: confirmationMessage })
  }, [error, isEmailChangePending])

  return (
    <div className={userProfileCss['container']}>
      <EditableField label="First Name" fieldValue={firstName} fieldName="first_name" inputType="text" onSave={handleUpdateProfileData} />
      <EditableField label="Last Name" fieldValue={lastName} fieldName="last_name" inputType="text" onSave={handleUpdateProfileData} />
      <EditableField label="Email" fieldValue={EmailSchema.parse(user.email)} fieldName="email" inputType="email" onSave={handleUpdateEmail} />
      {isEmailChangePending && <p className={userProfileCss['status-pending']}>Pending</p>}
    </div>
  )
}