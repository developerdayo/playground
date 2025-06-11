'use client'

import { isAuthApiError, type User } from '@supabase/supabase-js'

import { useEffect, useState } from 'react'
import { supabase } from '@lib/supabase/client'

import { EditableField } from '@components/EditableField/EditableField'

import userProfileCss from './user-profile.module.scss'
import { z } from 'zod/v4'
import { useSearchParams } from 'next/navigation'

type UserProfileProps = {
  user: User | null
}

type UserDataType = {
  first_name: string
  last_name: string
  email?: string
}

const ProfileSchema = z.object({
  first_name: z.preprocess(val => val ?? 'N/A', z.string().min(1)),
  last_name: z.preprocess(val => val ?? 'N/A', z.string().min(1)),
})

const EmailSchema = z.object({
  email: z.preprocess(val => val ?? 'N/A', z.email()),
})

export const UserProfile = ({user}: UserProfileProps) => {
  const [userData, setUserData] = useState<UserDataType | undefined>(undefined)
  const [userEmail, setUserEmail] = useState<string>(user?.email || 'N/A')
  const [error, setError] = useState<null | string>(null)
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null)
  const firstName = userData?.first_name || 'N/A'
  const lastName = userData?.last_name || 'N/A'
  const searchParams = useSearchParams()

  const handleUpdateProfileData = async (fieldName: string, fieldValue: string) => {
    try {
      const { data, error } = await supabase.from('profiles').update({ [fieldName]: fieldValue }).eq('user_id', user?.id).select()
      if (error) throw error
      if (data && data.length > 0) setUserData(ProfileSchema.parse(data[0]))
    } catch (error) {
      console.log('Error updating user pofile data', error)
    }
}

const handleUpdateEmail = async (fieldName: string, fieldValue: string) => {
  try {
    z.email().parse(fieldValue)
    const { data, error } = await supabase.auth.updateUser({ [fieldName]: fieldValue }, { emailRedirectTo: 'http://localhost:3000/profile?redirectSource=emailChange' })
    if (error) throw error
    if (data) setConfirmationMessage(`Please finalize the email change via the confirmation emails sent to the current email: ${userEmail} and the new email: ${fieldValue}`)
    setError(null)
    } catch (error) {
      if (isAuthApiError(error)) setError(`${error.message}`)
      console.log('Error updating email', error)
    }
  }

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select().eq('user_id', user?.id)
        if (error) throw error
        if (data) setUserData(ProfileSchema.parse(data[0]))
      } catch (error) {
        console.log('Error fetching user profile data', error)
      }
    }
    fetchUserProfileData()
  }, [])
  
  return (
    <div className={userProfileCss['container']}>
      <EditableField label="First Name" fieldValue={firstName} fieldName="first_name" inputType="text" onSave={handleUpdateProfileData} />
      <EditableField label="Last Name" fieldValue={lastName} fieldName="last_name" inputType="text" onSave={handleUpdateProfileData} />
      <EditableField label="Email" fieldValue={userEmail} fieldName="email" inputType="email" onSave={handleUpdateEmail} />
      {error && <p className={userProfileCss['error']}>{error}</p>}
      {confirmationMessage && <p className={userProfileCss['confirmation']}>{confirmationMessage}</p>}
      {(searchParams.has('message') && searchParams.get('redirectSource') === 'emailChange') && <p className={userProfileCss['confirmation']}>{searchParams.get('message')}</p>}
      {(!searchParams.has('message') && searchParams.get('redirectSource') === 'emailChange') && <p className={userProfileCss['confirmation']}>Your email was successfully updated.</p>}
    </div>
  )
}