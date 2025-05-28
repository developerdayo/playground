import { ReactNode } from "react"

type AllowedTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"

type TextType = {
  tag: AllowedTags
  children: ReactNode
  className?: string
  isCurrent: "true" | "false"
}

const Text = ({className, isCurrent, children, tag: Tag }: TextType) => {
  return (
    <Tag className={className} aria-current={isCurrent}>
      {children}
    </Tag>
  )
}
export default Text