import { useRef, useState } from 'react'

import { Button } from '@components/Buttton/Button'

import { InputField } from '../InputField/InputField'

import editableFieldCss from './editable-field.module.scss'

type EditableFieldProps = {
  label: string
  fieldValue: string
  fieldName: string
  inputType: "text" | "email"
  onSave: (field: string, value: string) => Promise<void>
  className?: string
}

export const EditableField = ({label, fieldName, fieldValue, inputType, className, onSave}: EditableFieldProps) => {
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
      <div className={className}>
        <InputField label={label} type={inputType} ref={inputRef} />
        <Button onPress={() => setIsEditMode(false)} className={editableFieldCss['cancel-button']}>Cancel</Button>
        <Button onPress={handleSave} className={editableFieldCss['button']}>Save</Button>
      </div>
    ) : (
      <div className={className}>
        <span>{label}: </span>
        <span>{fieldValue}</span>
        <Button onPress={() => setIsEditMode(true)} className={editableFieldCss['button']}>Edit</Button>
      </div>
    )
  )
}