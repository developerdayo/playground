import clsx from "clsx"
import { ReactNode } from "react"

import textCss from '../../utils/styles/texts.module.scss'

type AllowedTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"

type TextType = {
  tag: AllowedTags
  children: ReactNode
  className?: string
  isCurrent?: "true" | "false"
}

const Text = ({className, isCurrent, children, tag: Tag }: TextType) => {

  let tagClassName;
  switch (Tag) {
    case "h1":
      tagClassName = textCss['h1']
      break
    case "h2":
      tagClassName = textCss['h2']
      break
    case "h3":
      tagClassName = textCss['h3']
      break
    case "h4":
      tagClassName = textCss['h4']
      break
    case "h5":
      tagClassName = textCss['h5']
      break
    case "h6":
      tagClassName = textCss['h6']
      break
    case "p":
      tagClassName = textCss['p']
      break
    case "span":
      tagClassName = textCss['span']
      break
    default:
      tagClassName = textCss['span']
  }

  return (
    <Tag className={clsx(tagClassName, className)} aria-current={isCurrent}>
      {children}
    </Tag>
  )
}
export default Text