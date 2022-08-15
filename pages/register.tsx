import Head from "next/head"

export default function Register(){
    return (
      <div>
        <Head>
          <title>Register - Gains Over Time</title>
          <meta name="description" content="Track your workout progess over time." />
          <link rel="icon" href="/favicon.ico"/>
        </Head>
  
        <main>
          <h1 className="text-3xl font-bold underline">
            Register to start tracking your workouts
          </h1>
        </main>
      </div>
    )
  }