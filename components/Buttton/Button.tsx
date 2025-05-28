import ButtonCss from './buttton.module.scss'

type ButtonType = {
    children: React.ReactNode
    callback?: () => void
    formAction?: React.ButtonHTMLAttributes<HTMLButtonElement>['formAction']
}

export const Button = ({children, callback, formAction}: ButtonType) => {
  return (
    <button onClick={callback} formAction={formAction} className={ButtonCss['button']}>
      {children}
    </button>
  )
}