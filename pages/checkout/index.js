import { GetStaticProps } from "next"
import Head from "next/head"
import Client from "shopify-buy"

const Checkout = ({checkout}) => {
  return (
    <>
      <Head>
        <title>Pasta: Checkout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>THIS IS THE CHECKOUT</h2>
      <a href={`${checkout.webUrl}`}>go to checkout</a>
    </>
  )
}

export const getStaticProps = async() => {
  
  const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
  });

  let checkout = await client.checkout.create()
  // Do something with the checkout
  console.log(checkout)

  return {
    props: {
      checkout: JSON.parse(JSON.stringify(checkout))
    }
  }  
}

export default Checkout