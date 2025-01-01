import { fetchCFJSON } from "../../extraction/contentful/fetchCFData";
import { transformEntries } from "./trEntries";

export const transformPage = async (slug) => {
  // Get slug and its target and its template from CF
  // ================================================
  const objPage: ISlug = await fetchCFJSON({
    contentType: "slug",
    limit: 1,
    include: 10,
    slug: slug,
  });

  // Transform the page details
  // ==========================
  // If the page doesn't have a template, then return null.  It will not be displayed.
  let pageDetails = [];
  if (objPage.items[0]?.fields?.target?.fields?.template.sys.id) {
    pageDetails = transformPageDetails(
      objPage.items[0]?.fields?.target?.fields
    );
  } else {
    pageDetails = null;
  }

  return pageDetails;
};

export function transformPageDetails(page) {
  // Get Page Contents
  // =================
  // Clear the array pageContents to be populated with ...
  // ... the new array of content for the target page of this slug.
  // var pageContents = [];
  // // If the page has contents, transform them.
  // // TODO:  Confirm: Can pages only have Standard Content?
  // // This routine only calls transformStandardContent!!!!!!!!!!
  // // TODO: Archived content creates an <n empty items> entry.  Maybe correct this.
  // if (page?.content?.length) {
  //   for (
  //     var iContent = 0;
  //     iContent < page?.content?.length;
  //     ++iContent
  //   ) {
  //     // If the contents do not have a locale...
  //     // ... it means that they are archived.  So just skip them.

  //     if (page?.content[iContent]?.sys.locale) {
  //     pageContents[iContent] = transformStandardContent(
  //       page?.content[iContent]
  //     );} else {
  //       console.log("Content archived:");
  //       console.log(page?.content[iContent]?.sys.id);

  //     }
  //   }
  // } else {
  //   pageContents = null;
  // }

  let contentEntries = [];
  if (page?.content?.length) {
    contentEntries = transformEntries(page?.content, null);
  } else {
    contentEntries = null;
  }

  // HTML <head> details </head>
  // ==============================
  // Get the page details for the page's header
  const pageHeadProps = {
    pageTitle: page?.title || null,
    pageMetadescription: page?.metadescription || null,
    pageKeywords: page?.keywords || null,
    ogTitle: page?.ogtitle || null,
    ogDescription: page?.ogdescription || null,
    ogImage: page?.ogimage?.fields?.file?.url || null,
  };

  // Return Page Details
  // ===================
  // Return all of this including the page contents and header above.
  const pageLocaleDetails = {
    pageTemplateID: page?.template?.sys.id || null,
    pageACL: page?.acl || null,
    pageReactComponentPath: page?.template?.fields?.reactComponentPath || null,
    pageContents: contentEntries,
    pageHeadProps: pageHeadProps,
  };

  // console.log("pageLocaleDetails %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
  // console.log(pageLocaleDetails);

  return pageLocaleDetails;
}
