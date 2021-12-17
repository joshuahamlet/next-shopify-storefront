import '../styles/globals.css'
import type { AppProps } from 'next/app'

console.log(process.env.REACT_APP_SHOPIFY_DOMAIN)
console.log(process.env.REACT_APP_SHOPIFY_API)

function MyApp({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />
  
}

export default MyApp
