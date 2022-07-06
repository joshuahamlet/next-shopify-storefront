import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useAtom } from 'jotai'
import { currentIdAtom, envStatusAtom, pastaFilterAtom, productsAtom } from '../components/atoms'
import Client from 'shopify-buy'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'


const Home: NextPage = ({ products }:any) => {

  const [pastaFilter, setPastaFilter] = useAtom(pastaFilterAtom)
  const [baseURL] = useAtom(envStatusAtom)

  const [currentId, setCurrentId] = useAtom(currentIdAtom)

  useEffect(()=> {
    console.log(displayCards())
  }, [pastaFilter])

  useEffect(()=> {
    emptyIdHandler()
  }, [])

  const [fetchedProducts, setFetchedProducts] = useAtom(productsAtom)

  const currentIdHandler = (id: string) => {
    setCurrentId(id)
  }

  const emptyIdHandler = () => {
    setCurrentId('')
  }

  const router = useRouter()
  const { id } = router.query

  const displayCards = () => {
    let filteredProducts = pastaFilter === '' ? products : pastaFilter === "fuck" ? [] : products.filter((x:any) => x.productType === pastaFilter)

    return filteredProducts.map((p:any) => {
            
      console.log("STUFF IS HAPPENING", products.filter((x:any) => x.productType === pastaFilter))
      return (
        <motion.div
          key={p.id} 
          initial={{opacity: p.id === currentId ? 1 : 0 }}
          animate={{opacity: 1, transition : { delay: p.id === currentId ? 0 : 1 }}}
          exit={{opacity: p.id === currentId ? 1 : 0, transition : { duration: .5}}} 
          layout="position"
          layoutId={`productCard${p.id}`} 
          className={styles.card}
          onClick={()=> currentIdHandler(p.id)}
        >
        <Link key={p.id} href={`/pasta/${p.id}`}>
          <a >
            <motion.h2 style={{margin: '15px'}}>{p.title}</motion.h2>
            <div className={styles["pasta-image"]}>
            <Image placeholder='blur' blurDataURL={p.images[0].src} layout='fill' className={styles.cardImage} src={p.images[0].src} />
            </div>
            <p className={styles.description} style={{/*margin: '15px'*/}}>
              {p.description}
            </p>
          </a>
        </Link>
        </motion.div>
        )
  })}

  return (
    <div className={styles.container}>      
      <main className={styles.main}>
        <div className={styles.grid}>
          <AnimatePresence exitBeforeEnter>
            {displayCards()}    
          </AnimatePresence>
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
