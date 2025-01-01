import React, { StrictMode } from "react";
import type { AppProps } from "next/app";
// import { AppContextProvider } from "../components/presentation/context/contextAppProvider";
import { HtmlHead } from "../components/presentation/htmlHead/htmlHead";
import Script from "next/script";
import "../styles/default.css";
import "../styles/custom.css";

export default function App({ Component, pageProps }: AppProps) {
  // For multiple Contexts, watch this: https://www.youtube.com/watch?v=52W__dKdNnU

  // const entries = pageProps?.ThisTemplate?.entries;

  // TODO: Consider having a Cookie Consent field in CF, ...
  // like with the nav and footer props - not searched for.
  // const entryCookieConsent =
  //   entries?.find((item) => item.contentName === "cookieConsent") || null;
  // const CookieConsentText = entryCookieConsent?.contentText1;

  // TODO: Optimise fonts.
  // https://nextjs.org/docs/pages/building-your-application/optimizing/fonts

  return (
    <StrictMode>
      <HtmlHead
        pageHeadProps={pageProps?.ThisPageDetails?.pageHeadProps}
        globalHeadProps={pageProps?.HeadProperties}
        stylesheet={pageProps?.Stylesheet}
        cfScripts={pageProps?.Scripts?.value}
        key="head"
      />
      <Script id="cms-js" type="text/javascript">
        {pageProps?.Scripts}
      </Script>
      <Script
        id="google-tagline"
        async
        src={pageProps?.HeadProperties?.googleTagLine}
      />
      <Script id="google-gtag">
        {"window.dataLayer = window.dataLayer || []; "}
        {"function gtag(){dataLayer.push(arguments);} "}
        {'gtag("js", new Date()); '}{" "}
        {pageProps?.HeadProperties?.googleTagScript}
      </Script>

      <Component {...pageProps} />
    </StrictMode>
  );
}
