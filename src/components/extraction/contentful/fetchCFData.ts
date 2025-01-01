// Retrieve data from Contentful.
import { createClient } from "contentful";
import { FetchCFProps, ICFDATA, IescLocale } from "../../../types/esc-types";

// https://danielcorcoranssql.wordpress.com/2020/08/26/integrating-contentful-with-react-typescript/

const client = createClient({
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  host: process.env.NEXT_PUBLIC_HOST!,
});

// Returns data from Contentful based on what you specify in props.
// locale: Either ->
//   - don't specify the default locale if localisation is not enables for the content_type
//  or
//   - specify * for all available locales

// interface CFData {
//   // Define the structure of the data returned by Contentful here
// }

export const fetchCFJSON = async (props: FetchCFProps): Promise<ICFDATA> => {
  const jsonCFData = await client.getEntries({
    content_type: props.contentType,
    include: props.include,
    locale: props.locale,
    order: props.order,
    limit: props.limit,
    "fields.name": props.fieldName,
    "fields.slugPost": props.slugPost,
    "fields.slugParent": props.slugParent,
    "fields.slug": props.slug,
    "sys.id": props.sys_id,
  });

  return jsonCFData as ICFDATA;
};

export const fetchCFJSONAllLocales = async (props: FetchCFProps): Promise<ICFDATA> => {
  const jsonCFData = await client.withAllLocales.getEntries({
    content_type: props.contentType,
    include: props.include,
    order: props.order,
    limit: props.limit,
    "fields.name": props.fieldName,
    "fields.slugPost": props.slugPost,
    "fields.slugParent": props.slugParent,
    "fields.slug": props.slug,
    "sys.id": props.sys_id,
  });

  return jsonCFData;
};

// Template for calling fetchCFJSON
// You can omit fields that are not releavnt
// =========================================
// const objSlugs2: ISlug[] = await fetchCFJSON({
//   contentType: "post",
//   limit: 100,
//   include: 1,
//   order: "",
//   locale: "en",
//   fieldName: "",
//   slugPost: "",
//   slug: "",
//   sys_id: "",
// });

export const getAllLocales = async (): Promise<IescLocale[]> => {
  const locales = await client.getLocales();
  return locales.items.map((locale) => ({
    code: locale.code,
    name: locale.name,
    default: locale.default,
    fallbackCode: locale.fallbackCode,
  }));
};

// CONSIDER: Can we reduce calls and code by getting everything need for the whole site ...
//  ... with one call (??)
// export const getGlobalData = async (props:any): Promise<temp> => {
//     const glbProperties: IProperty = await fetchCFData('property', 100, 1 );
//     const glbPages: IPage = await fetchCFData('page', 100, 5 );
//     const glbCSS: IStylesheet = await fetchCFData('stylesheet', 100, 1, 'sys.createdAt' );
//     const glbScripts: IScript = await fetchCFData('script', 100, 1, 'sys.createdAt' );
//     const glbSlugs: ISlug = await fetchCFData('slug', 100, 5, '', 'en');
//     const glbTemplates: ITemplate = await fetchCFData('template', 100, 5 );

//     let GlobalData={glbProperties, glbCSS, glbScripts, glbNavigation, glbSlugs }
//   return GlobalData;
// }
