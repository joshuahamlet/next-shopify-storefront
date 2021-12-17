import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Client from 'shopify-buy'


const Pasta = ({product}) => {
  console.log('PRODUCT', product)
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <p>{product.id}</p>
      <p>{product.title}</p>
      <p>{product.description}</p>
    </>
  )
}

export const getStaticProps: GetStaticProps = async({params}) => {
  console.log('params', params)
  const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN, 
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API 
  })

  let response = await client.product.fetch(params.id)
  let product = response
    // Do something with the product
    console.log(product.id);
    console.log(product.description);
    console.log('fuckingPRODUCT', product);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    },
  }
}

export const getStaticPaths: GetStaticPaths = async() => {
  
  const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
  })
    
  let response = await client.product.fetchAll()
  let products = response
    
  let productIds = products.map(i => i.id)
  console.log('Product Ids', productIds)

  const paths = productIds.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false
  }
}

export default Pasta