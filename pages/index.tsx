import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useAtom } from 'jotai'
import { productsAtom } from '../components/atoms'
import Client from 'shopify-buy'
import { useEffect, useState } from 'react'


const Home: NextPage = ({ products }:any) => {

  const [pastaFilter, setPastaFilter] = useState('')
  const [filterClicked, setFilterClicked] = useState(false)

  //console.log(products)

  useEffect(()=> {
    console.log(displayCards())
  }, [pastaFilter])

  const [fetchedProducts, setFetchedProducts] = useAtom(productsAtom)

  const filterHandler = (selection:string) => {
    setPastaFilter(selection)
  }

  const filterClickedHandler = () => {
    setFilterClicked(p => p = !p)
  }

  const displayCards = () => {
    let filteredProducts = pastaFilter === '' ? products : products.filter((x:any) => x.productType === pastaFilter)

    return filteredProducts.map((p:any) => {
            
      console.log("STUFF IS HAPPENING", products.filter((x:any) => x.productType === pastaFilter))
      return (
        
        <Link key={p.id} href={`http://localhost:3000/pasta/${p.id}`}>
        <a className={styles.card}>
          <h2 style={{margin: '15px'}}>{p.title}</h2>
          <div style={{ 
            position: 'relative',
            
            left: '50%',
            transform: "translateX(-50%)",
            width: '250px', 
            height: '150px', 
            margin: '0px', 
            padding: '0px', 
            overflow: 'hidden', 
            boxShadow: '0 0 20px 5px #b8b8b8',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            justifySelf:'center'
          }}>
            <Image placeholder='blur' blurDataURL={p.images[0].src} layout='fill' className={styles.cardImage} src={p.images[0].src} />
          </div>
          <p style={{
            margin: '15px', 
            display: '-webkit-box',
            WebkitLineClamp: '4',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {p.description}
          </p>
        </a>
        </Link>
        )
  })}

  return (
    <div className={styles.container}>
      <Head>
        <title>Pasta!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <h1>
            <a className={`${styles.title} ${styles.textfocusin} display: inline`} href="https://nextjs.org">Pasta!</a>
          </h1>
        </span>

        <div style={{display: 'flex', justifyContent: "flex-start", width: "100%", marginLeft: "3rem"}}>
          <div onClick={filterClickedHandler} style={{ padding: "10px", borderRadius: "5px", backgroundColor: "purple", color: "white", cursor: "pointer"}}>FILTERS</div>
            {
              filterClicked && (
              <div style={{position: "relative", width: "0px"}}>
                <div className={styles.card} style={{display: "flex", justifyContent:"flex-start",position: "absolute", zIndex: 2, margin: 0, marginLeft: "5px", height:"auto", minWidth: "150px", width: "150px"}}>
                  <div style={{position: "relative", height: "20px", width: "100%", display: "flex", justifyContent: "flex-end"}}>
                    <div onClick={filterClickedHandler} style={{ position: "absolute", padding: "0px 3px", margin: "3px 3px", borderRadius: "5px", backgroundColor: "purple", color: "white", cursor: "pointer", textAlign: 'center'}}>x</div>
                  </div>
                    <div style={{width: "100%", padding:"0px 20px 20px 20px", display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center"}}>
                    <div style={{ margin: "2px", padding: "5px", borderRadius: "5px", backgroundColor: "purple", color: "white", cursor: "pointer", width: "80%", textAlign: 'center'}} onClick={() => filterHandler('short')}>Short</div>
                    <div style={{ margin: "2px", padding: "5px", borderRadius: "5px", backgroundColor: "purple", color: "white", cursor: "pointer", width: "80%", textAlign: 'center'}} onClick={() => filterHandler('long')}>Long</div>  
                    <div style={{ margin: "2px", padding: "5px", borderRadius: "5px", backgroundColor: "purple", color: "white", cursor: "pointer", width: "80%", textAlign: 'center'}} onClick={() => filterHandler('soup')}>Soup</div>  
                    <div style={{ margin: "2px", padding: "5px", borderRadius: "5px", backgroundColor: "purple", color: "white", cursor: "pointer", width: "80%", textAlign: 'center'}} onClick={() => filterHandler('')}>Clear</div>  
                  </div>
                  </div>
              </div>
              )
            }
        </div>

        <div className={styles.grid}>

          {displayCards()}

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN, 
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API 
  })

  client.product.fetch('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzcwNzQxMDc2NTQzMTk=').then((product) => {
    // Do something with the product
    //console.log('FUCKING PRODUCT',product.productType);
  });

  let response = await client.product.fetchAll()
  let products = response


  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

export default Home
