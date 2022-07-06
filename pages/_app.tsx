import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import LayoutMainHeader from '../components/layouts/LayoutMainHeader'

console.log(process.env.REACT_APP_SHOPIFY_DOMAIN)
console.log(process.env.REACT_APP_SHOPIFY_API)

function MyApp({ Component, pageProps, router }: AppProps) {

  return (
      <AnimatePresence exitBeforeEnter>
        <LayoutMainHeader>
          <Component {...pageProps} key={router.route} />
        </LayoutMainHeader>
      </AnimatePresence>
  )
}

export default MyApp
