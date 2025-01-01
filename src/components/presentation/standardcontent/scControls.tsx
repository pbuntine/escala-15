// import ReactMarkdown from "react-markdown";
// import React from "react";
// import Entries from "../entries/prEntries";
// import { useContext } from "react";
// import { AuthContext } from "../context/contextAuthentication";
// import LinkLogout from "../link/linkLogout";

// // Explanation:
// // This Standard Content component renders the following:
// // - contentTextWrapper = contains all Standard Content fields
// // - contentEntries = all Entries each rendered separately ...
// //   ... equal to and outside the contentTextWrapper

// // div (key)
// //   div
// //     content
// //   /div
// //   entries
// //   renderer entries
// // /div

// export default function Controls({ item }) {
//   const { authenticated } = useContext(AuthContext);

//   const standardcontentClassNames =
//     "scDefault standard-content " +
//     item?.contentClassName +
//     " " +
//     item?.contentRendererClassName;

//   // If it does have a RendererReactComponentPath, lazy load the Renderer and use it.
//   // If it doesn't have a RendererReactComponentPath, use the standard renderer.

//   if (authenticated) {
//     return (
//       <LinkLogout item=""/>
//     );
//   } else {
//     return (
//       <div id={item.name} key={item.id} className={standardcontentClassNames}>
//         <div className="contentTextWrapper">
//           {item.contentTitle && (
//             <div className="title">
//               <span>{item?.contentTitle}</span>
//             </div>
//           )}
//           {item.contentSubtitle && (
//             <div className="subtitle">
//               <span>{item?.contentSubtitle}</span>
//             </div>
//           )}
//           {item.contentText1 && (
//             <div className="text1">
//               <ReactMarkdown>{item?.contentText1}</ReactMarkdown>
//             </div>
//           )}
//           {item.contentText2 && (
//             <div className="text2">
//               <ReactMarkdown>{item?.contentText2}</ReactMarkdown>
//             </div>
//           )}
//         </div>
//         {item.contentEntries && (
//           <Entries entries={item.contentEntries} reactComponentPath="" />
//         )}
//         {item.contentRendererEntries && (
//           <Entries
//             entries={item.contentRendererEntries}
//             reactComponentPath=""
//           />
//         )}
//       </div>
//     );
//   }
// }
