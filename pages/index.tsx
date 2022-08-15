import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from '../utils/iron-session-config';

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) return { 
      redirect: {
        destination: '/login',
        permanent: false,
      }
    };

    return {
      props: {
        user: req.session.user,
      },
    };
  },
  ironOptions
);

export default function Home(){
  return (
    <div className={styles.container}>
      <Head>
        <title>Gains Over Time</title>
        <meta name="description" content="Track your workout progess over time." />
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </main>
    </div>
  )
}
