import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

const About: NextPage = () => {
  useEffect(() => {
    fetch("/api/resources/about")
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .then((res) => {
        console.log(res);
      });
  }, []);
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>About Page</main>
    </div>
  );
};

export default About;
