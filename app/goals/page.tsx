import { Navigation } from "../../components/Navigation/Navigation"
import { MOCK_LINKS } from "../../mocks/links"

export const Page = () => {
  return (
    <>
      <Navigation items={MOCK_LINKS} />
      <div>Hello</div>
    </>
  )
}
export default Page