import { MOCK_LINKS } from "../../mock/links"
import { HEADER_AUTH } from "../../utils/variables"
import { Navigation } from "../Navigation/Navigation"
import { headers } from "next/headers"
import headerCss from './header.module.scss'

export const Header = async () => {
  let isLoggedIn = await headers().then((headers) => headers.get(HEADER_AUTH))

  return (
    <header className={headerCss['header']}>
      { isLoggedIn
        ? <Navigation items={MOCK_LINKS} />
        : <Navigation items={[{ name: 'log in', url: '/login' }, { name: 'create user', url: '/create-user' }]} />
      }
    </header>
  )
}

/** first, we check if the x-supebase-logged-in header is present. if it is, we show them the 'logged in' navigation experience featuring links
 * only available to sessions with a user session
 * if the header is not present, we show the csr navigation because we then need to call supabase to check if a user session can be established
 * if the header is present, it means a user session exists, so we show the 'logged in' navigation experience
*/