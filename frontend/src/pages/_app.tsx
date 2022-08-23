import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import Layout from "../components/main-layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
