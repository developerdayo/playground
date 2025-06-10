import { headers } from "next/headers"

import { MOCK_LINKS } from "@mocks/links"
import { HEADER_AUTH } from "@utils/variables"

import { Navigation } from "@components/Navigation/Navigation"
import { WelcomeUser } from "@components/WelcomeUser/WelcomeUser"

import headerCss from './header.module.scss'

export const Header = async () => {
  let isLoggedIn = await headers().then((headers) => headers.get(HEADER_AUTH))

  return (
    <header className={headerCss['header']}>
      { isLoggedIn
        ? (
          <>
            <Navigation items={MOCK_LINKS} />
            <WelcomeUser />
          </>
        )
        : <Navigation items={[{ name: 'log in', url: '/login' }, { name: 'create user', url: '/create-user' }]} />
      }
    </header>
  )
}