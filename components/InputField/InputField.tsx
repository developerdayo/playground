/**
 * Simple Input field that allows text and email types
 * Toggle option to show label on/off easily
 */
type InputFieldType = {
  name: string
  hideLabel: boolean
  isRequired: boolean
  labelText?: string
  type: Extract<React.InputHTMLAttributes<HTMLInputElement>['type'], 'text' | 'email' | 'password'>
}

export const InputField = ({name, hideLabel, labelText, isRequired, type }: InputFieldType) => {
  return (
    <>
      <label htmlFor={name} aria-required={isRequired} hidden={hideLabel}>{labelText}</label>
      <input id={name} name={name} type={type} required={isRequired} />
    </>
  );
}