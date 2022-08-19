import { withIronSessionSsr } from "iron-session/next";
import Head from "next/head"
import LoginForm from "../components/LoginForm"
import { ironOptions } from "../utils/iron-session-config";

export default function Login(){
  
  return (
    <div>
      <Head>
            <title>Login - Gains Over Time</title>
            <meta name="description" content="Track your workout progess over time." />
            <link rel="icon" href="/favicon.ico"/>
      </Head>
      <LoginForm/>
    </div>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    //if there is no user in session, return no props to the page
    if (!user)  return { props: {} };

    //if there is a user session, redirect them to homepage
    return { 
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }, ironOptions
);