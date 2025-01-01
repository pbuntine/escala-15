import { IescSlug } from "../../../types/esc-types";
import { ISlug } from "../../../types/cf-types";

export const allSlugsLookup = (slugItems: ISlug[]): IescSlug[] => {
  const allSlugs: IescSlug[] = [];
  slugItems.items
    .map((item) => item.fields.slug)
    .filter((item) => !!item)
    .forEach((item: string, slugIndex: number) => {
      Object.keys(item).forEach((locale, localeIndex) => {
        allSlugs.push({ slug: item[locale], slugIndex, locale, localeIndex });
      });
    });

// This creates a list of all slugs for all posts that look like this:
// [  {
//   slug: 'home',
//   slugIndex: 11,
//   locale: 'en',
//   localeIndex: 0
// },]

  return allSlugs;
};

export const allPostsLookup = (slugItems: ISlug[]): IescSlug[] => {
  const slugs = slugItems.items
    .map((item) => item.fields.slugPost)
    .filter((item) => !!item);
    const allSlugs: IescSlug[] = [];
    slugs.forEach((item: unknown, slugIndex: number) => {
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