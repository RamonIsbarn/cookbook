import GlobalStyle from "../styles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SWRConfig } from "swr";

async function fetcher(url) {
  const response = await fetch(url);
  return await response.json();
}

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SWRConfig>
  );
}
