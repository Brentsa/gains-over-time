import Head from "next/head"
import styles from '../styles/Home.module.css'

export default function Login(){
    return (
      <div className={styles.container}>
        <Head>
          <title>Login - Gains Over Time</title>
          <meta name="description" content="Track your workout progess over time." />
          <link rel="icon" href="/favicon.ico"/>
        </Head>
  
        <main>
          <h1 className="text-3xl font-bold underline">
            Login to start tracking your workouts
          </h1>
        </main>
      </div>
    )
  }