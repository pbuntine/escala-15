// import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import Entries from "../entries/prEntries";
// import { IescPostCategory } from "../../../types/esc-types";

// // Explanation:
// // postCategoryLink is dynamically called by src/presentation/post/scPostCategoryListing.tsx ...
// // ... based on the reactComponentPath of the links renderer.
// // Note that Post Category Listings are potentailly included on both Post Listing Page and Post Detail Pages.

// export default function PostcategoryLink({ item }: { item: IescPostCategory }) {
//   // Gets the primary slug of the current path.
//   const router = useRouter();
//   const slug = router.query.slug;
//   let filter = router.query.filter;

//   if (!filter) {
//     filter = "All";
//   }

//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, postCategoryTitle: string | undefined) => {
//     e.preventDefault();
//     // ThisContext.setPostCategory(postcategoryTitle);
//     // router.push("/" + slug + "/");
//     router.push(
//       {
//         pathname: "/" + slug + "/",
//         query: { filter: postCategoryTitle },
//       },
//       undefined,
//       { shallow: true }
//     );
//   };

//   // let postcategoryTarget = route + "/?category=" + item?.postcategoryName;
//   const postcategoryTarget = "#";

//   let postcategoryClassNames = `postcategoryWrapper ${item?.postCategoryClassName} ${item?.postCategoryRendererClassName}`;

//   // console.log("ThisContext.postCategory")
//   // console.log(ThisContext.postCategory)
//   if (item.postCategoryTitle === filter) {
//     // console.log("ThisContext.postCategory is active!!!!!!!!!!!!!")
//     postcategoryClassNames = postcategoryClassNames + " active";
//   }

//   // TODO I get a warning message about using an <a> in a Link tag.
//   // xt-dev.js:20 Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
//   // at a
//   // at a
//   // at LinkComponent (webpack-internal:///./node_modules/next/dist/client/link.js:101:23)
//   // at postcategoryLink (webpack-internal:///./src/presentation/post/postcategoryLink.tsx:28:74)
//   // But I cannot find a reference that explains how to do it properly.  Only the way I have done it.
//   // https://linguinecode.com/post/complete-guide-to-navigation-with-next-js-links
//   // Maybe use legacyBehavior - but then it complains about the target always being "#"
//   // https://nextjs.org/docs/pages/api-reference/components/link

//   return (
//     <Link
//       id={item.name}
//       key={item.id}
//       href={postcategoryTarget}
//       className={postcategoryClassNames}
//     >
//       {item.postCategoryEntries && (
//         <Entries entries={item.postCategoryEntries} reactComponentPath="" />
//       )}
//       <a onClick={(e) => handleClick(e, item.postCategoryTitle)}>
//         {item.postCategoryTitle && item.postCategoryTitle}
//       </a>
//     </Link>
//   );
// }
