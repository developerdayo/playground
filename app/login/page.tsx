import { Button } from "../../components/Buttton/Button"
import { Header } from "../../components/Header/Header"
import { InputField } from "../../components/InputField/InputField"
import { login, signup } from "./actions"
import loginCss from './login.module.scss'

export default function LoginPage() {
  return (
    <>
      <form className={loginCss['form']}>
        <InputField name='email' hideLabel={false} isRequired={true} type='email' labelText='Email:' />
        <InputField name='password' hideLabel={false} isRequired={true} type='password' labelText='Password:' />
        <Button formAction={login}>Log in</Button>
        <Button formAction={signup}>Sign up</Button>
      </form>
    </>
  )
}