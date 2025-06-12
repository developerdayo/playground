'use client'

import { usePathname } from "next/navigation";

import Link from "@components/Link/Link"
import Text from "@components/Text/Text";

import navigationCss from "./navigation.module.scss";

export type NavigationItemType = {
  name: string,
  url: string
}

type NavigationType = {
  items:  NavigationItemType[]
}

const NavigationLink = ({url, name}: NavigationItemType) => {
  const currentPath = usePathname()

  return (
    currentPath === url ? (
      <Text tag={"span"} className={navigationCss['item--active']} isCurrent={"true"}>{name}</Text>
    ) : (
      <Link url={url} className={navigationCss['item']} isCurrent={"false"} name={name}></Link>
    )
  )
}

export const Navigation = ({ items }: NavigationType) => {
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