import { fetchCFJSON } from "../../extraction/contentful/fetchCFData";
import { IProperty } from "../../../types/cf-types";
// import { IProperty, IScript, IStylesheet } from "../../../types/cf-types";
// import { concatTextareas } from "./concatTextareas";
import { parseProperties } from "./trProperties";
// import { NameTextareaItem } from "@/types/esc-types";

export const transformHtmlHeadProperties = async ({
  slug,
  pageMetadescription,
}: {
  slug: string;
  pageMetadescription?: string;
}) => {
  const objProperties: IProperty[] = await fetchCFJSON({
    contentType: "property",
    limit: 100,
    include: 1,
  });

  const arrayProperties = parseProperties(objProperties);

  //   const arrayStylesheet = concatTextareas(objStylesheet, "Stylesheet");
  //   const arrayScripts = concatTextareas(objScripts, "Scripts"); content-structure-version

  const contentStructureVersion = arrayProperties.find(
    (item) => item.name === "content-version"
  );

  let contentVersion = "";
  if (!contentStructureVersion) {
    contentVersion = "not found";
  } else {
    contentVersion = contentStructureVersion.value || "Not specified";
  }

  const googleAnalytics = arrayProperties.find(
    (item) => item.name === "google-analytics"
  );
  const domain = arrayProperties.find((item) => item.name === "domain");
  const canonicalDomain = arrayProperties.find(
    (item) => item.name === "canonical-domain"
  );
  const siteName = arrayProperties.find((item) => item.name === "siteName");
  const defaultDescription = arrayProperties.find(
    (item) => item.name === "siteDescription"
  );
  const defaultAuthor = arrayProperties.find(
    (item) => item.name === "defaultAuthor"
  );

  const googleTagLine = googleAnalytics
    ? "https://www.googletagmanager.com/gtag/js?id=" + googleAnalytics.value
    : "";
  const googleTagScript = googleAnalytics
    ? "gtag('config', '" + googleAnalytics.value + "' );"
    : "";
  const pageURL = domain ? "https://" + domain.value + "/" + slug + "/" : "";
  const canonicalPageURL = canonicalDomain
    ? "https://" + canonicalDomain.value + "/" + slug + "/"
    : "";

  let pageDescription;
  if (pageMetadescription) {
    pageDescription = pageMetadescription;
  } else {
    pageDescription = defaultDescription ? defaultDescription.value : "";
  }

  // Steps to load Google Fonts for use in the site:
  // - go to https://fonts.google.com/
  // - use the "Selected Families" function to <Link> code for inclusion in the html <head> tag
  // - add a "google-font-families" property in CF that looks like this (cut&paste from Google Fonts):
  // family=Montserrat:ital,wght@1,100&family=Oswald:wght@300;400
  const googleFontsProperty = arrayProperties.find(
    (item) => item.name === "google-font-families"
  );
  const googleFonts = googleFontsProperty
    ? "https://fonts.googleapis.com/css2?" +
      googleFontsProperty.value +
      "&display=swap"
    : null;

  return {
    googleAnalytics,
    domain,
    siteName,
    canonicalDomain,
    pageDescription,
    defaultAuthor,
    googleTagLine,
    googleTagScript,
    pageURL,
    canonicalPageURL,
    contentVersion,
    googleFonts,
  };
};

// export const transformHtmlHeadStylesheet = async () => {
//   const objStylesheet: IStylesheet[] = await fetchCFJSON({
//     contentType: "stylesheet",
//     limit: 100,
//     include: 1,
//     order: ["sys.createdAt"],
//   });

//   const nameTextareaItems: NameTextareaItem[] = objStylesheet.map(
//     (item: IStylesheet) => ({
//       fields: {
//         // @ts-expect-error: Need to work out the ts for name.
//         name: item.fields.name,
//         // @ts-expect-error: Need to work out the ts for textarea.
//         textarea: item.fields.textarea,
//       },
//     })
//   );
//   const strStylesheet = concatTextareas({ items: nameTextareaItems });

//   return strStylesheet;
// };

// export const transformHtmlHeadScripts = async () => {
//   const objScripts: IScript[] = await fetchCFJSON({
//     contentType: "script",
//     limit: 100,
//     include: 1,
//     order: ["sys.createdAt"],
//   });

//   const nameTextareaItems: NameTextareaItem[] = objScripts.map((item) => ({
//     fields: {
//         // @ts-expect-error: Need to work out the ts for name.
//         name: item.fields.name,
//         // @ts-expect-error: Need to work out the ts for textarea.
//         textarea: item.fields.textarea,
//     },
//   }));
//   const strScripts = concatTextareas({ items: nameTextareaItems });

//   return strScripts;
// };
