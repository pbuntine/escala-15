import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CookieConsent from "react-cookie-consent";
import { GetStaticPaths, GetStaticProps } from "next";
import { fetchCFJSONAllLocales } from "@/components/extraction/contentful/fetchCFData";
import { getPost } from "@/components/transformation/contentful/trPost";
import { allPostsLookup } from "@/components/transformation/contentful/trSlugs";
import { transformTemplate } from "@/components/transformation/contentful/trTemplates";
import { transformHtmlHeadProperties } from "@/components/transformation/contentful/trHtmlHead";
import Header from "@/components/presentation/template/layoutHeader";
import Footer from "@/components/presentation/template/layoutFooter";
import Entries from "@/components/presentation/entries/prEntries";
import DefaultPost from "@/components/presentation/post/postDefault";
import { IDynamicSlugPageProps } from "@/types/esc-types";
import { ISlug } from "@/types/cf-types";

// !=====================!
function DynamicSlugPage({
  ThisPageDetails,
  ThisTemplate,
}: IDynamicSlugPageProps) {
  // !====================!
  const router = useRouter();
  const { slug } = router.query;
  // What is returned is just the htmlHead and the body as follows:
  //  - htmlHead
  //  - Template (rendered by the DynamicRenderer)
  //    - Page Content
  //    - CookieConsent

  const entries = ThisTemplate.entries;

  const postBreadcrumb = "/" + slug;

  // TODO: Consider having a Cookie Consent field in CF, ...
  // like with the nav and footer props - not searched for.
  const entryCookieConsent =
    entries?.find((item) => item.contentName === "cookieConsent") || null;
  const CookieConsentText = entryCookieConsent.contentText1;

  // TODO: Investigate the implementation of layouts to ...
  // ... persist page state for a Single-Page Application (SPA) experience.
  // https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts

  // This process is called reconciliation, which is how React understands which elements have changed.
  // https://react.dev/learn/preserving-and-resetting-state

  // TODO: react component path in Template is no longer used.
  // Either use it or delete it from the CF content model.

  //   const MemoizedHeader = memo(Header, checkHeaderProps);
  // TODO: Change contents to entries everywhere and reduce the types to just one.

  return (
    <>
      <div id="pageWrapper" className="pageWrapper" key="props.ThisTemplate.id">
        <Header
          contents={ThisTemplate?.HeaderEntries}
          reactComponentPath={ThisTemplate?.reactComponentPath}
          key="header"
        />
        <div className="postBreadcrumbs">
          <Link href={postBreadcrumb} className="postPage-backlink">
            {slug}
          </Link>
        </div>
        <div className="postBody">
          <Entries entries={ThisPageDetails.postRendererEntries} />
          <DefaultPost item={ThisPageDetails} />
        </div>
      </div>
      <Footer contents={ThisTemplate?.FooterEntries} key="footer" />
      {CookieConsentText && (
        <CookieConsent
          location={"bottom"}
          cookieName="legal"
          disableStyles={true}
        >
          <div dangerouslySetInnerHTML={{ __html: CookieConsentText }}></div>
        </CookieConsent>
      )}
    </>
  );
}
export default DynamicSlugPage;

// See: https://wallis.dev/blog/nextjs-getstaticprops-and-getstaticpaths-with-typescript
// !================================================================
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug, post } = context.params as { slug: string; post: string };
  // !================================================================
  // const { slug, post } = context.params as IParams; // no longer causes error

  // Get Page data for the current page
  // =====================================
  const thisPageDetails = await getPost(post);

  // Get the Template data for the current page
  // ===========================================
  // Templates typically define the following:
  //  - Main Navigation
  //  - Footer
  const templateID = thisPageDetails.postTemplateID;
  const thisTemplate = await transformTemplate(templateID);

  // Properties, Stylesheet, Scripts - all for htmlHead
  // ==================================================
  // These are all required by templates
  // TODO: This should be called just once and added to a context
  //  that will be used in every page.
  // TODO: Error handling and placement
  const pageMetadescription =
    thisPageDetails?.pageHeadProps?.pageMetadescription;
  const globalHtmlHeadProps = await transformHtmlHeadProperties({
    slug,
    pageMetadescription,
  });

  return {
    props: {
      // Stylesheet: globalStylesheet,
      // Scripts: globalScripts,
      ThisPageDetails: thisPageDetails,
      ThisTemplate: thisTemplate,
      HeadProperties: globalHtmlHeadProps,
      // TemplateHeader: templateHeader,
      // TemplateFooter: templateFooter,
      // TemplateCookieConsent: templateCookieConsent,
    },
  };
};

// See: https://wallis.dev/blog/nextjs-getstaticprops-and-getstaticpaths-with-typescript
// !=========================================================
export const getStaticPaths: GetStaticPaths = async () => {
  // !=======================================================
  // const objSlugs: ISlug[] = await fetchCFData("post", 100, 1, "", "*", "");
  const objSlugs: ISlug[] = await fetchCFJSONAllLocales({
    contentType: "post",
    limit: 100,
    include: 1,
  });

  const slugsLocaleLookupTable = allPostsLookup(objSlugs);

  return {
    paths: slugsLocaleLookupTable.map((page) => {
      return {
        params: {
          slug: page.slug,
          post: page.post,
        },
      };
    }),
    fallback: false,
  };
};
