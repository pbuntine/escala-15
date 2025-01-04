import Head from "next/head";
import packageJson from "../../../../package.json";
import Style from "styled-jsx/style";
import React from "react";
import { HtmlHeadProps } from "../../../types/esc-types";

// TODO:
// Needs exception handling and thorough testing.

// The pageHeadProps is called from /pages/[slug]/index.tsx
// If you want to render more attributes, you must add them to the interface and send them here.
// The following data needs to be passed in as props:
//  From CF properties:
//   - googleAnalytics
//   - domain
//   - canonicalDomain
//   - siteName
//   - defaultDescription
//  From the Page in CF:
//   - title
//   - description
//   - keywords
//   - opengraph content

export const HtmlHead = ({
  pageHeadProps,
  globalHeadProps,
  stylesheet,
}: HtmlHeadProps) => {
  // TODO: Pass in the language of the page.
  // const lang = "en";
  // TODO: Standardise base Scripts
  // https://stackoverflow.com/questions/51060111/how-to-import-a-stylesheet-from-external-source-in-react

  // Favicons....
  // See https://realfavicongenerator.net/ for how to generate these icons.
  // Currently they need to be manually created and uploaded ...
  //  ... to the /public/ folder of the project.

  // TODO: https://nextjs.org/docs/basic-features/script
  //  Use Next Script - but you need to get it to work.
  // TODO: remove the eslint rule:
  // https://nextjs.org/docs/basic-features/eslint#disabling-rules

  // TODO: Fix Author - sending an object.

  return (
    <>
      <Head>
        {pageHeadProps?.pageTitle || process.env.NEXT_PUBLIC_SITE_URL || "Site"}</title>
        {globalHeadProps?.pageDescription && (
          <meta name="description" content={globalHeadProps.pageDescription} />
        )}
        <meta charSet="utf-8" />
        {pageHeadProps?.pageKeywords && (
          <meta name="keywords" content={pageHeadProps?.pageKeywords} />
        )}
        <meta
          name="author"
          content={
            pageHeadProps?.postAuthor
              ? pageHeadProps?.postAuthor
              : globalHeadProps?.defaultAuthor?.value
          }
        />
        <link rel="canonical" href={globalHeadProps?.canonicalPageURL} />

        <meta
          name="cf-content-version"
          content={globalHeadProps?.contentVersion}
        />
        <meta name="app-content-version" content={process.env.NEXT_PUBLIC_CONTENT_VERSION} />
        <meta name="app-version" content={packageJson.version} />
        <meta name="space" content={process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID} />
        <meta name="environment" content={process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT} />
        <meta name="host" content={process.env.NEXT_PUBLIC_HOST} />

        {"<!-- favicons from https://realfavicongenerator.net/ -->"}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/images/apple-touch-icon.png" color="#5bbad5" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />

        {"<!-- OpenGraph -->"}
        <meta property="og:title" content={pageHeadProps?.ogTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={globalHeadProps?.pageURL} />
        <meta property="og:image" content={pageHeadProps?.ogImage} />
        <meta property="og:image:secure_url" content={pageHeadProps?.ogImage} />
        <meta
          property="og:description"
          content={pageHeadProps?.ogDescription}
        />
        <meta
          property="og:site_name"
          content={globalHeadProps?.siteName?.value ?? ""}
        />
        {globalHeadProps?.author && (
          <meta
            property="og:article:author"
            content={
              pageHeadProps.postAuthor
                ? pageHeadProps.postAuthor
                : globalHeadProps.author.value
            }
          />
        )}
      </Head>
      {/* {"<!-- Google Fonts -->"} */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {globalHeadProps?.googleFonts && (
        <link rel="stylesheet" href={globalHeadProps?.googleFonts} />
      )}
      {stylesheet && (
        <Style id="cms-css" type="text/css">
          {stylesheet}
        </Style>
      )}
    </>
  );
};
