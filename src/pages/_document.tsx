import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        
        <meta name="description" content="Your app description" />
        <meta property="og:title" content="Your App Name" />
        <meta property="og:description" content="Your app description" />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
