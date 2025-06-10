'use client'

import type { TextFieldProps, LabelProps, InputProps } from "react-aria-components";
import { Input as RACInput, TextField as RACTextField, Label as RACLabel } from "react-aria-components";

/**
 * Composite component build with React Aria TextField, Label, and Input.
 */
type InputFieldProps = {
  isRequired: boolean
  label?: string
  name?: string
  inputProps?: InputProps
  labelProps?: LabelProps
} & TextFieldProps

export const InputField = ({
  isRequired,
  label,
  name,
  type,
  inputProps,
  labelProps,
  ...textFieldProps
}: InputFieldProps) => {
  return (
    <RACTextField type={type} {...textFieldProps}>
      <RACLabel {...labelProps}>{label}</RACLabel>
      <RACInput required={isRequired} name={name} {...inputProps} />
    </RACTextField>
  );
}