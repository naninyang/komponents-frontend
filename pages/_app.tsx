import type { AppProps } from "next/app";
import { Gowun_Batang, Lato } from "next/font/google";
import styled from "@emotion/styled";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { rem } from "@/styles/designSystem";
import "@/styles/globals.sass";

const batang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["vietnamese"],
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

const Container = styled.main({
  display: "flex",
  justifyContent: "center",
  flex: 1,
  padding: `0 ${rem(25)}`,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          .ss {
            font-family: ${lato.style.fontFamily}, -apple-system,
              BlinkMacSystemFont, system-ui, sans-serif;
          }
          body,
          pre,
          input,
          button,
          textarea,
          select,
          legend {
            font-family: ${batang.style.fontFamily}, -apple-system,
              BlinkMacSystemFont, system-ui, serif;
          }
        `}
      </style>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}
