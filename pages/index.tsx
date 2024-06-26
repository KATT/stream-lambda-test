import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    // stream response from /api/hello
    const eventSource = new EventSource("/api/hello");
    eventSource.onmessage = (event) => {
      console.log(new Date(), event.data);
    };
    eventSource.onerror = (event) => {
      console.error(event);
    };
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>Open console.</main>
    </>
  );
}
