import GlobalStyle from "../styles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

async function fetcher(url) {
  const response = await fetch(url);
  return await response.json();
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SWRConfig value={{ fetcher }}>
      <SessionProvider session={session}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </SWRConfig>
  );
}
