import type { NextPage } from 'next'
import Head from 'next/head'
import styles from './styles.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Students</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          List of students
        </h1>

      </main>
    
    </div>
  )
}

export default Home
