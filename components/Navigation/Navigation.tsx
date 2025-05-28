import { headers } from "next/headers"
import navigationCss from "./navigation.module.css";
import Link from "../Link/Link"
import Text from "../Text/Text";
import { HEADER_CURRENT_PATH } from "../../utils/variables";

type NavigationItemType = {
  name: string,
  url: string
}

type NavigationType = {
  items:  NavigationItemType[]
}

const NavigationLink = async ({url, name}: NavigationItemType) => {

  let currentPathnameHeader = await headers().then((headers) => headers.get(HEADER_CURRENT_PATH))
  currentPathnameHeader = currentPathnameHeader != null ? currentPathnameHeader : ''

  return (
    currentPathnameHeader === url ? (
      <Text tag={"span"} className={navigationCss['item--active']} isCurrent={"true"}>{name}</Text>
    ) : (
      <Link url={url} className={navigationCss['item']} isCurrent={"false"} name={name}></Link>
    )
  )
}

export const Navigation = async ({ items }: NavigationType) => {

  return (
    items.length > 0 ? (
      <nav className={navigationCss['nav']}>
        {items.map(item => <NavigationLink key={item.name} url={item.url} name={item.name} />)}
      </nav>
    ) : (
      <></>
    )
  )
}