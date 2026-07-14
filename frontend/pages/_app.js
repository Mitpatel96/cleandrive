import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Keshav Marketplace — Global Logistics between China, India & Australia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Freight forwarding, warehousing and supplier sourcing between China, India and Australia. Hand-to-hand service, zero-hassle paperwork." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
