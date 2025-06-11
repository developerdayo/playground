'use client'

import { Form } from "@/components/Form/Form"
import { Button } from "@/components/Buttton/Button"
import { InputField } from "@/components/InputField/InputField"
import { login, signup } from "./actions"
import loginCss from './login.module.scss'
import buttonCss from '@/components/Buttton/buttton.module.scss'
import { useState } from "react"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleLogin = async (formData: FormData) => {

    const result = await login(formData)
    result.error && setError(result.error)
  }
  const handleSignup = async (formData: FormData) => {
    const result = await signup(formData)
    result.error && setError(result.error)
    result.success && setIsSuccess(result.success)
  }
  return (
    <Form className={loginCss['form']}>
      <InputField
        isRequired={true}
        label='Email:'
        name='email'
        type='email'
      />
      <InputField
        isRequired={true}
        label='Password:'
        name='password'
        type='password'
      />
      {error && <p className={loginCss['error']}>{error}</p>}
      {isSuccess && <p>Please check your email to validate the creation of your account.</p>}
      <Button className={buttonCss['button']} formAction={handleLogin}>Log in</Button>
      <Button className={buttonCss['button']} formAction={handleSignup}>Sign up</Button>
    </Form>
  )
}