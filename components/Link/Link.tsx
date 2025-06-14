import type { NavigationItem } from "@components/Navigation/Navigation"

import { default as NextLink } from "next/link"

import Text from "@components/Text/Text"

interface LinkType extends NavigationItem {
  isCurrent: "true" | "false"
  className?: string
  prefetch?: boolean
}

const Link = ({url, name, isCurrent, className, prefetch}: LinkType) => {
  return (
    <NextLink href={url} aria-current={isCurrent} className={className} prefetch={prefetch ?? false}>
      <Text tag={"span"} isCurrent={isCurrent}>{name}</Text>
    </NextLink>
  )
}
export default Link