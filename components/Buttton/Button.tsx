'use client'

import { Ref } from 'react'
import clsx from 'clsx'
import { Button as RACButton } from 'react-aria-components'

import buttonCss from './button.module.scss'

type ButtonType = {
  children: React.ReactNode
  onPress?: () => void
  formAction?: React.ButtonHTMLAttributes<HTMLButtonElement>['formAction']
  ref?: Ref<HTMLButtonElement>
  className?: string | string[]
}

/**
 * Uses React Aria Button component unless if a server action is passed to it.
 * TODO: does this make sense? 
 */
export const Button = ({children, onPress, formAction, ref, className, ...props}: ButtonType) => {
  return formAction ? (
    <button
      className={clsx(className ?? buttonCss['button'])}
      formAction={formAction}
      onClick={onPress}
      ref={ref}
      {...props}
    >
      {children}
    </button>
    ) : (
      <RACButton
        className={clsx(className ?? buttonCss['button'])}
        onPress={onPress}
        ref={ref}
        {...props}
      >
        {children}
      </RACButton>
    )
}