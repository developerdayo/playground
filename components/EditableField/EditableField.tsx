import { useRef, useState } from 'react'

import { Button } from '@components/Buttton/Button'

import editableFieldCss from './editable-field.module.scss'

type EditableFieldProps = {
  label: string
  fieldValue: string
  fieldName: string
  inputType: "text" | "email"
  onSave: (field: string, value: string) => Promise<void>
}

export const EditableField = ({label, fieldName, fieldValue, inputType, onSave}: EditableFieldProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    if (inputRef.current?.value) {
      try {
        await onSave(fieldName, inputRef.current.value)
        setIsEditMode(false)
      } catch (error) {
        console.error('Error saving field:', error)
      }
    }
  }

  return (
    isEditMode ? (
      <div className={editableFieldCss['container']}>
        <p>{label}: <input type={inputType} ref={inputRef} /></p>
        <Button onPress={() => setIsEditMode(false)} className={[editableFieldCss['button'], editableFieldCss['cancel-button']]}>Cancel</Button>
        <Button onPress={handleSave} className={editableFieldCss['button']}>Save</Button>
      </div>
    ) : (
      <div className={editableFieldCss['container']}>
        <p>{label}: {fieldValue} </p>
        <Button onPress={() => setIsEditMode(true)} className={editableFieldCss['button']}>Edit</Button>
      </div>
    )
  )
}