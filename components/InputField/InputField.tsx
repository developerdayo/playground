'use client'

import { forwardRef } from "react";
import type { TextFieldProps, LabelProps, InputProps } from "react-aria-components";
import { Input as RACInput, TextField as RACTextField, Label as RACLabel } from "react-aria-components";

import inputFieldCss from './input-field.module.scss'

/**
 * Composite component build with React Aria TextField, Label, and Input.
 */
interface InputFieldProps extends TextFieldProps {
  isRequired?: boolean
  label?: string
  name?: string
  inputProps?: InputProps
  labelProps?: LabelProps
  ref?: React.Ref<HTMLInputElement>
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  isRequired,
  label,
  name,
  type,
  inputProps,
  labelProps,
  ...textFieldProps
}, ref) => {
  return (
    <RACTextField className={inputFieldCss['container']} type={type} {...textFieldProps}>
      <RACLabel className={inputFieldCss['label']} {...labelProps}>{label}: </RACLabel>
      <RACInput className={inputFieldCss['input']} required={isRequired ?? false} name={name} ref={ref} {...inputProps} />
    </RACTextField>
  );
})