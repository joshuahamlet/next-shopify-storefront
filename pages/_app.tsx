import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import LayoutMainHeader from '../components/layouts/LayoutMainHeader'
import { currentAnimationAtom, filterClickedAtom } from '../components/atoms'
import { useAtom } from 'jotai'

console.log(process.env.REACT_APP_SHOPIFY_DOMAIN)
console.log(process.env.REACT_APP_SHOPIFY_API)

function MyApp({ Component, pageProps, router }: AppProps) {
  const [filterClicked, setFilterClicked] = useAtom(filterClickedAtom)

  const filterHandler = () => {
    setFilterClicked(false)
    console.log(filterClicked)
  }

  return (
      <AnimatePresence exitBeforeEnter>
        <LayoutMainHeader>
          <Component onClick={filterHandler} {...pageProps} key={router.route} />
        </LayoutMainHeader>
      </AnimatePresence>
  )
}

export default MyApp
