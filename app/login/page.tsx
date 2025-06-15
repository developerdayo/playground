'use client'

import { useState } from "react"

import { login, signup } from "./actions"

import { Form } from "@/components/Form/Form"
import { Button } from "@/components/Buttton/Button"
import { InputField } from "@/components/InputField/InputField"

import loginCss from './login.module.scss'


export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleLogin = async (formData: FormData) => {
    const result = await login(formData)

    if (result.error) setError(result.error)
  }

  const handleSignup = async (formData: FormData) => {
    const result = await signup(formData)

    if (result.error) {
      setError(result.error)
    } else if (result.success) {
      setIsSuccess(result.success)
    }
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
      {error && <p className={loginCss['error']}>Error: {error}</p>}
      {isSuccess && <p>Please check your email to validate the creation of your account.</p>}
      <div className={loginCss['button-container']}>
        <Button formAction={handleLogin}>Log in</Button>
        <Button formAction={handleSignup}>Sign up</Button>
      </div>
    </Form>
  )
}