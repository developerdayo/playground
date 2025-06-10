'use client'

import { Form as RACForm } from 'react-aria-components'

type FormProps = {
  className?: string
  children: React.ReactNode
}

export const Form = ({children, className}: FormProps) => {
  return <RACForm className={className}>{children}</RACForm>
}