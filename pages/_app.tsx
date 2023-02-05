import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Head from 'next/head'
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Track your workout progess over time." />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="/public/icons/Logo_320.png"
          rel="icon"
          type="image/png"
          sizes="320x320"
        />
        <link
          href="/public/icons/Logo_32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" sizes="320x320" href='/public/icons/Logo_320.png' />
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

