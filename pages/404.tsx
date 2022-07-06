import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/404.module.css'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.back()
    }, 4000)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.messageAnimation}>404</div>
      <div className={styles.message}>PAGE NOT FOUND</div>
    </div>
  )
}

export default NotFound