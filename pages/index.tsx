import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useAtom } from 'jotai'
import { currentAnimationAtom, currentIdAtom, envStatusAtom, pastaFilterAtom, productsAtom } from '../components/atoms'
import Client from 'shopify-buy'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'


const Home: NextPage = ({ products }:any) => {

  const [pastaFilter, setPastaFilter] = useAtom(pastaFilterAtom)
  const [currentAnimation, setCurrentAnimation] = useAtom(currentAnimationAtom)
  const [baseURL] = useAtom(envStatusAtom)


  const [currentId, setCurrentId] = useAtom(currentIdAtom)
  const currentIdRef =useRef('')
  const stayRef = useRef()

  useEffect(()=> {
    currentIdRef.current = currentId
  }, [setCurrentId])

  // useEffect(()=> {
  //   console.log(displayCards())
  //   console.log(currentAnimation)
  // }, [pastaFilter])

  useEffect(()=> {
    console.log("MAIN RENDERED")
    emptyIdHandler()
    setCurrentAnimation('filter')
  }, [])

  

  const [fetchedProducts, setFetchedProducts] = useAtom(productsAtom)

  const currentIdHandler = (id: string) => {
    setCurrentId(id)
  }

  const emptyIdHandler = () => {
    setCurrentId('')
  }

  const filterCurrentAnimationHandler = () => {
    setCurrentAnimation('filter')
  }

  const router = useRouter()
  const { id } = router.query 

  const Cards = () => {

    console.log("CARDS RENDERED")
    let filteredProducts = pastaFilter === '' ? products : pastaFilter === "fuck" ? [] : products.filter((x:any) => x.productType === pastaFilter)
    
    return filteredProducts.map((p:any) => {
      //<Card p={p} />
      p.id === currentId ? console.log(p.id) : console.log("nope")
      return(
      <motion.div key={currentId ? `update${p.id}` : p.id}>
      <Link   href={`/pasta/${p.id}`}>
        <a>
          <motion.div
            //key={p.id} 
            initial={{
              opacity: currentId ? 1:   0, 
            }}
            animate={{
              opacity: 1, 
              //transition : { delay: p.id === currentId ? 0 : 1 },
              transition : { duration: 1.5}

            }}
            exit={{
              opacity: p.id === currentId ? 1 : 0, 
              transition : { duration: 2.5 },
            }} 

            layout="size"
            layoutId={`productCard${p.id}`} 
            className={styles.card}
            onClick={()=> currentIdHandler(p.id)}
          >
            <h2 layoutId={`title${p.id}`} style={{margin: '15px'}}>
              {p.title}
            </h2>
            <motion.div  initial={{x: "-50%"}}    className={styles["pasta-image"]}>
              <Image placeholder='blur' blurDataURL={p.images[0].src} layout='fill' className={styles.cardImage} src={p.images[0].src} />
            </motion.div>
            <motion.p exit={{scale: 0}} className={styles.description} style={{/*margin: '15px'*/}}>
              {p.description}
            </motion.p>
          </motion.div>
        </a>
      </Link>
      </motion.div>
      )
  })
  
  } 
  
  
  

  return (
    <div className={styles.container}>      
      <main className={styles.main}>
        {/* <div className={styles.grid}> */}
        <AnimatePresence exitBeforeEnter>

        <motion.div className={styles.grid}
          key={pastaFilter}
          initial={{x:  "-100vw"}}
          animate={{x: 0, transition: {duration: 1.75}}}
          exit={{x:  "100vw", transition: {duration: 1.5} }}
          >      

          {/* <DisplayCards> */}
          {/* <Cards/> */}
          

          {Cards()}
          {/* </DisplayCards> */}
          
          
          {/* {Cards()} */}
        </motion.div>
          </AnimatePresence>

        

        {/* </div> */}
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
