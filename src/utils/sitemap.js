/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const { outputFileSync } = require("fs-extra");
const { createClient } = require("contentful");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });

// const {
//   fetchCFJSONAllLocales,
// } = require("../components/extraction/contentful/fetchCFData");
// const {
//   allSlugsLookup,
// } = require("../components/transformation/contentful/trSlugs");
// const { ISlug as type } = require("../types/cf-types");

//  The script above generates a sitemap.xml file in the public directory of a Next.js project. The file contains a single URL entry with a location of  https://example.com/ , a last modification date of 2021-01-01, a change frequency of monthly, and a priority of 1.0.
//  To run the script, you can use the following command:
//  node src/utils/sitemap.ts
//  After running the script, you should see the following output:
//  /Users/your-username/your-project/public/sitemap.xml
// Sitemap generated at /Users/your-username/your-project/public/sitemap.xml

const client = createClient({
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
  host: process.env.NEXT_PUBLIC_HOST,
});

let today = new Date();
let lastmod = today.toISOString();
let site_url = process.env.SITE_URL;

// Get Slugs
const fetchCFJSONAllLocales = async (props) => {
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

const allSlugsLookup = (slugItems) => {
  const allSlugs = [];
  slugItems.items
    .map((item) => item.fields.slug)
    .filter((item) => !!item)
    .forEach((item, slugIndex) => {
      Object.keys(item).forEach((locale, localeIndex) => {
        allSlugs.push({ slug: item[locale], slugIndex, locale, localeIndex });
      });
    });

  return allSlugs;
};

const allPostsLookup = (slugItems) => {
  const slugs = slugItems.items
    .map((item) => item.fields.slugPost)
    .filter((item) => !!item);
    const allSlugs = [];
    slugs.forEach((item, slugIndex) => {
      Object.keys(item).forEach((locale, localeIndex) => {
        allSlugs.push({ post: item[locale], slug: slugItems.items[slugIndex].fields.slugParent[locale], slugIndex, locale, localeIndex });
      });
    });
  
// This creates a list of all slugs for all posts that look like this:
// [  {
//   post: 'commercial-finance-specialist-philippa-eddie-career-after-partnership',
//   slug: 'blog',
//   slugIndex: 11,
//   locale: 'en',
//   localeIndex: 0
// },]

  return allSlugs;
};

async function generateSitemap() {
  const outputFile = "sitemap.xml";
  const publicDir = "public";
  const outputPath = path.resolve(process.cwd(), publicDir, outputFile);

  // Get an array of all slugs
  const objSlugs = await fetchCFJSONAllLocales({
    contentType: "slug",
    limit: 100,
    include: 1,
  });
  const slugsLocaleLookupTable = allSlugsLookup(objSlugs);
  
  // Get an array of all posts
  const objPosts = await fetchCFJSONAllLocales({
    contentType: "post",
    limit: 100,
    include: 1,
  });
  const postsLocaleLookupTable = allPostsLookup(objPosts);

  // Create the sitemap file with /post pages
  const post_sitemap = postsLocaleLookupTable
  .map(({ slug, post }) => {
    return `
    <url>
    <loc>https://${site_url}/${slug}/${post}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    </url>`;
  })
  .join("");
  
  
  // Create the sitemap file with /slug pages
  const slug_sitemap = slugsLocaleLookupTable
  // .map(({ slug, locale }) => {
  .map(({ slug }) => {
    return `
    <url>
    <loc>https://${site_url}/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    </url>`;
  })
  .join("");
  
  // Add the two arrays together
  const sitemap_entries = slug_sitemap + post_sitemap;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${sitemap_entries}
  </urlset>`;

  outputFileSync(outputPath, sitemap);

  console.log(`Sitemap generated at ${outputPath}`);
}

generateSitemap();
