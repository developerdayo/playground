'use client'

import type { User } from '@supabase/supabase-js'

import { useState } from 'react'
import { supabase } from '@lib/supabase/client'

import { EditableField } from '@components/EditableField/EditableField'

import userProfileCss from './user-profile.module.scss'

type UserProfileProps = {
  user: User | null
}

export const UserProfile = ({user}: UserProfileProps) => {
  const [userData, setUserData] = useState(user)
  const firstName = userData?.user_metadata?.firstName || 'N/A'
  const lastName = userData?.user_metadata?.lastName || 'N/A'
  const email = userData?.email || 'N/A'

  const updateUserData = async (fieldName: string, fieldValue: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { [fieldName]: fieldValue }
      })
      if (error) throw error
      if (data.user) setUserData(data.user)
    } catch (error) {
      console.log('Error updating user data', error)
    }
  }
  
  return (
    <div className={userProfileCss['container']}>
      <EditableField label="First Name" fieldValue={firstName} fieldName="firstName" inputType="text" onSave={updateUserData} />
      <EditableField label="Last Name" fieldValue={lastName} fieldName="lastName" inputType="text" onSave={updateUserData} />
      <EditableField label="Email" fieldValue={email} fieldName="email" inputType="email" onSave={updateUserData} />
    </div>
  )
}