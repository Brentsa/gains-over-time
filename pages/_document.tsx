import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full bg-gray-50">
        <Head>
            <title>Gains Over Time</title>
            <meta name="description" content="Track your workout progess over time." />
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <body className="h-full">
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}