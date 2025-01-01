// import { Entry } from "contentful";
import "react";

declare module "react" {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

import { Header } from "next/dist/lib/load-custom-routes";
import { ParsedUrlQuery } from "querystring";
import {
  IProperty,
  IPage,
  IStylesheet,
  IScript,
  ISlug,
  ITemplate,
  IStandardcontent,
  ILink,
  IPost,
  IPostCategory,
  IRendererStandardContent,
  IImage,
  IImageRenderer,
  IPerson,
  IPersonRenderer,
  IRendererPost,
  IRendererForm,
  IRendererFormField,
  IRendererLink,
} from "./cf-types";
// import { Entry } from "contentful";
// import { Entry } from "contentful";

export interface IfooterEntries {
  contents: [];
}

export interface DynamicRendererProps {
  readonly item: unknown; // Replace 'any' with the appropriate type if known
  readonly reactComponentPath: string;
}

export interface Iiframe {
  iframeWidth: string;
  iframeHeight: string;
  iframeTitle: string;
  iframeSource: string;
  iframeOptions?: string;
  name: string;
  id: string;
  iframeClassNames?: string;
  contentName: string;
  contentTitle?: string;
  contentSubtitle?: string;
  contentText1?: string;
  contentText2?: string;
  contentEntries?: EntriesProps; // Replace 'any' with the appropriate type if known
}

export interface Ientry {
  item: unknown; // Replace 'any' with the appropriate type if known
  reactComponentPath?: string;
  key: string;
}

export interface PageHeadProps {
  pageTitle?: string;
  pageKeywords?: string;
  postAuthor?: string;
  ogTitle?: string;
  ogImage?: string;
  ogDescription?: string;
}

export interface HtmlHeadProps {
  pageHeadProps: PageHeadProps;
  globalHeadProps: GlobalHeadProps;
  stylesheet: string;
}

export interface GlobalHeadProps {
  pageDescription?: string;
  canonicalPageURL?: string;
  contentVersion?: string;
  defaultAuthor?: { value: string };
  siteName?: { value: string };
  pageURL?: string;
  googleFonts?: string;
  author?: { value: string };
}

interface IDynamicSlugPageProps {
  ThisPageDetails: {
    pageContents: Ientry[];
    pageTemplateID: string;
    pageHeadProps: {
      pageMetadescription: string;
    };
  };
  ThisTemplate: {
    entries: Ientry[];
    HeaderEntries: Ientry[];
    FooterEntries: Ientry[];
    reactComponentPath: string;
  };
}

export interface EntriesProps {
  entries: Ientry[];
  reactComponentPath?: string;
  section?: string;
}

export interface ContentsProps {
  contents: Ientry[];
  reactComponentPath?: string;
  section?: string;
}

export interface FetchCFProps {
  contentType: string;
  include?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  locale?: string | undefined;
  order?: [props.order] | undefined;
  limit?: number | undefined;
  fieldName?: string | undefined;
  slugPost?: string | undefined;
  slugParent?: string | undefined;
  slug?: string | undefined;
  sys_id?: string | undefined;
}

export interface IDropDownNav {
  showDropDownNav: boolean | null;
  setDropDownNav: (value: boolean) => void;
}

export interface IHamburgerContextProviderProps {
  children: React.ReactNode;
}

export interface ILocaleFields {
  /** name */
  name: string;

  /** react component path */
  reactComponentPath: string;

  /** Entries */
  entries?: IStandardcontent[] | undefined;

  /** ACL */
  acl?: "public" | "logged in" | "not logged in" | "admin only" | undefined;

  /** className */
  className: string;
}
// export interface ILocale extends Entry<ILocaleFields> {

// }

export type ICFDATA =
  | ILocale
  | IPost
  | IPostCategory
  | IImage
  | IImageRenderer
  | ILink
  | IPage
  | IPerson
  | IPersonRenderer
  | IProperty
  | IRendererPost
  | IRendererForm
  | IRendererFormField
  | IRendererLink
  | IRendererStandardContent
  | IScript
  | ISlug
  | IStandardcontent
  | IStylesheet
  | ITemplate;

// TODO: Should be consistent and/or complete.  Maybe split up.
// https://www.typescriptlang.org/docs/handbook/basic-types.html#table-of-contents
// https://www.typescriptlang.org/docs/handbook/advanced-types.html
// https://blog.logrocket.com/types-vs-interfaces-in-typescript/

// for each locale and each page, return the following:
//  - pageLocale
//  - pageTitle
//  - pageMetadescription
//  - pageKeywords
//  - pageACL
//  - pageTemplateID
//  - pageContent
//    - contentStandardContent
//      - contentName
//      - contentTitle
//      - contentSubtitle
//      - contentText1
//      - contentText2
//      - contentACL
//      - contentEntries
//        - // TODO: later
//      - contentImages[n]
//        - path
//        - name
//      - contentID
//      - contentClassName
//      - rendererStandardContentID
// TODO: Lookup the TemplateID and RendererID here to get that info and add it.
// - rendererStandardContent
//   - rendererReactComponentPath
//   - rendererEntries
//   - rendererImages
//   - rendererACL
// - rendererClassName
//  - pageTemplate
//    - templatePath
//    - templateReactComponentPath
//    - templateEntries
//    - templateImages
//    - templateACL
//    - templateClassName

// TODO: Lookup the actual fields for Locales and add them here.
// CF unfortuantely don't create the interfaces for Locales - strangely...
// ... so I am doing it here.

export interface IescLocale {
  name: string;
  code: string;
  default: boolean;
  fallbackCode?: string | null;
}

export interface IescSlug {
  slug: string;
  slugIndex: number;
  locale: string;
  localeIndex: number;
}

export interface IescProperty {
  name?: string;
  value?: string;
}

export interface IescTemplate {
  templateID: string;
  templateName: string;
  templateReactComponentPath: string;
  templateEntries: Array<object>;
  templateACL: string;
  templateClassName: string;
}

interface ArrayPageLocale {
  locale: string;
  localeIndex: number;
  slug: string;
  slugIndex: number;
}
interface PageLocaleDetails {
  pageSlug: string;
  pageTitle?: string;
  pageMetadescription?: string;
  pageKeywords?: string;
  pageACL: string;
  pageReactComponentPath?: string;
  pageContents: Array<{
    contentName: string;
    contentTitle?: string;
    contentSubtitle?: string;
    contentText1?: string;
    contentText2?: string;
    contentACL: string;
    contentID?: string;
    contentClassName?: string;
    contentImage?: Array<{
      contentImage: string;
    }>;
    reactComponentPath: string;
    contentRendererClassName?: string;
    contentRendererACL: string;
  }>;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface SlugItem {
  slug: string;
  locale?: string;
}

interface Navigation {
  title: string;
  link: string;
}

interface Footer {
  title: string;
  link: string;
}

export interface IcontentEntries {
  contents: {
    contentEntries: Ientry[]; // Replace 'any' with the appropriate type if known
  };
}

interface DynamicSlugPageProps {
  Locales: Array<{
    index: number;
    code: string;
    name: string;
  }>;
  DefaultLocale: {
    index: number;
    code: string;
    name: string;
  };
  LocaleNavigation: Array<{
    title: string;
    link: string;
  }>;
  SlugsLocaleLookupTable: Array<{
    slug: string;
    slugIndex: number;
    locale: string;
    localeIndex: number;
  }>;
  LocaleMainNavLogo: string;
  Properties: {
    name: string;
    value: string;
  };
  Stylesheet: {
    name: string;
    value: string;
  };
  Scripts: {
    name: string;
    value: string;
  };
  CookieConsent: {
    name: string;
    value: string;
  };
  PageDetails: Array<{
    pageLocale: string;
    pageLocaleDetails: Array<{
      pageSlug: string;
      pageTitle?: string;
      pageMetadescription?: string;
      pageKeywords?: string;
      pageACL: string;
      pageTemplateID: string;
      pageReactComponentPath: string;
      pageContents: Array<{
        contentName: string;
        contentTitle?: string;
        contentSubtitle?: string;
        contentText1?: string;
        contentText2?: string;
        contentACL: string;
        contentID?: string;
        contentClassName?: string;
        contentImage?: Array<{
          contentImage: string;
        }>;
        reactComponentPath?: string;
        contentRendererClassName?: string;
        contentRendererACL: string;
      }>;
    }>;
  }>;
}

export interface PageContentProps {
  pageContents: Array<{
    contentName: string;
    contentTitle?: string;
    contentSubtitle?: string;
    contentText1?: string;
    contentText2?: string;
    contentACL: string;
    contentID?: string;
    contentClassName?: string;
    contentImage?: Array<{
      contentImage: string;
    }>;
    reactComponentPath: string;
    contentRendererClassName?: string;
    contentRendererACL: string;
  }>;
}

export interface StandardContent {
  contentName: string;
  contentTitle?: string;
  contentSubtitle?: string;
  contentText1?: string;
  contentText2?: string;
  contentACL: string;
  contentID?: string;
  contentClassName?: string;
  contentImage?: Array<{
    contentImage: string;
  }>;
  reactComponentPath: string;
  contentRendererClassName?: string;
  contentRendererACL: string;
}

export interface IescStandardContent {
  id: string;
  name: string;
  contentName: string;
  contentTitle?: string;
  contentSubtitle?: string;
  contentText1?: string;
  contentText2?: string;
  contentACL: string;
  contentID?: string;
  contentClassName?: string;
  contentImage?: Array<{
    contentImage: string;
  }>;
  contentEntries?: EntriesProps | undefined; // Replace 'any' with the appropriate type if known
  contentRendererClassName?: string;
  contentRendererACL: string;
  contentRendererEntries?: EntriesProps | undefined; // Replace 'any' with the appropriate type if known
  reactComponentPath: string;
  contentRendererClassName?: string;
  contentRendererACL: string;
}

export interface image {
  imageName: string;
  imageURL: string;
  imageWidth: string;
  imageHeight: string;
  imageAlt: string;
  imageCaption: string;
  imageRendererID: string;
}

export interface IimageItem {
  imageClassName?: string;
  imageRendererClassName?: string;
  imageConversion?: string | null;
  imageURL: string;
  imageWidth?: number;
  imageHeight?: number;
  imageName: string;
  imageAlt: string;
  imagePriority?: boolean;
  imageID?: string; // Added imageID property
}

export interface NameTextareaItem {
  fields: {
    name: string;
    textarea?: string;
  };
}

export interface NameTextareas {
  items: NameTextareaItem[];
}

export interface IescLink {
  name: string;
  id: string;
  linkClassName?: string;
  linkRendererClassName?: string;
  linkAriaLabel?: string;
  linkTitle: string;
  linkInternalTarget?: string;
  linkExternalTarget?: string;
  linkEntries?: Array<object>;
  ariaLabel?: string;
}

export interface IFetchPostParams {
  contentType: string;
  limit: number;
  include: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined;
  slugPost: string;
}

export interface IPostDetails {
  reactComponentPath: string | null;
  id: string;
  name: string | undefined;
  contentType: string | undefined;
  postName: string | null;
  postSlugParent: string | null;
  postSlug: string | null;
  pageTitle: string | null;
  pageMetadescription: string | null;
  pageKeywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  postPrimaryImage: string | null;
  postPrimaryImageAltText: string | null;
  postTitle: string | null;
  postSubtitle: string | null;
  postDate: string | null;
  postAuthor: string | null;
  postText: string | null;
  postCategories: IPostCategory[] | null;
  postCategoriesList: string[] | null;
  postACL: string | null;
  postClassName: string;
  postID: string | null;
  postRendererID: string | null;
  postRendererClassName: string;
  postRendererACL: string | null;
  postRendererEntries: unknown[] | null;
  postTemplateID: string | null;
  postTemplateContents: unknown;
  postRelatedPosts: unknown[] | null;
  postEntries: unknown[] | null;
  postClassNames: string;
}

export interface IescPost {
  id: string;
  name: string;
  postName?: string;
  postID?: string;
  postClassNames?: string;
  postSlugParent?: string;
  postSlug?: string;
  ogDescription?: string;
  ogImage?: string;
  postPrimaryImage?: string;
  postPrimaryImageAltText?: string;
  postTitle?: string;
  postSubtitle?: string;
  postDate?: string;
  postAuthor?: string;
  postText?: string;
  postCategories?: Array<object>;
  postCategoriesList?: Array<object>;
  postACL?: string;
  postRendererEntries?: Array<object>;
  postRendererACL?: string;
  postEntries?: Array<object>;
  postRendererClassName?: string;
  postRelatedPosts?: Array<object>;
}

export interface IescPostCategory {
  id: string;
  name: string;
  postCategoryClassName?: string;
  postCategoryRendererClassName?: string;
  postCategorySlug?: string;
  postCategoryTitle?: string;
  postCategoryEntries?: Array<object>;
}

// Old declarations - review / consider / tidy up

export interface ContentfulPageContent extends PageContent {
  properties?: DefaultProperty[];
  internalTarget?: string;
  externalTarget?: string;
}

export interface PageContent {
  /** Content to be displayed within the page */
  contents: Content[];
  /** Page header containing meta data and so on */
  header: Header;
  template: StandardSiteTemplate;
  isLoading?: boolean;
  wrapperFooter?: wrapperFooter;
  categoryBlock?: CategoryBlock;
  popularPostBlock?: PostBlock;
  recentPostBlock?: PostBlock;
}
