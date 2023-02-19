import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full" style={{background: 'linear-gradient(to left top, #fca5a5 0%, 10%, #e5e7eb 50%, 80%, #c4b5fd 90%)', backgroundAttachment: 'fixed'}}>
        <Head/>
        <body className="h-full">
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}