import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

// TODO: Consider using DocumentContext as per this article: https://nextjs.org/docs/advanced-features/custom-document
// TODO: Consider using external scripts and stylesheets as per this article: https://nextjs.org/docs/messages/no-stylesheets-in-head-component

// Do not add <script> tags using next/head (see inline <script>). Use next/script instead.
// See more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component


export default function Document() {
  return (
    <Html lang="en">
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
