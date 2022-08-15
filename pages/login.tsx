import Head from "next/head"
import LoginForm from "../components/LoginForm"

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