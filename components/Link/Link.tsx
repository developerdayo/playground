import { NavigationItemType } from "../Navigation/Navigation"
import { default as NextLink } from "next/link"
import Text from "../Text/Text"

type LinkType = {
  isCurrent: "true" | "false"
  className?: string
} & NavigationItemType

const Link = ({url, name, isCurrent, className}: LinkType) => {
  return (
    <NextLink href={url} aria-current={`${isCurrent}`} className={className}>
      <Text tag={"span"} isCurrent={`${isCurrent}`}>{name}</Text>
    </NextLink>
  )
}
export default Link