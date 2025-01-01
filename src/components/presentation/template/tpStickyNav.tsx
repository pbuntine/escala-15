// import React from "react";
// import CookieConsent from "react-cookie-consent";
// import Entries from "../entries/prEntries";

// function Template(props) {
//   // This will function creates the page structure.
//   // CSS handles the placements and styling.
//   // Most content is made up of entries - so this is called for each section of the page.

//   // TODO: Needs rewriting - copy Non-Sticky

//   const bodyEntries = props.objectItem.templateContents.objTemplate.bodyEntries;
//   const pageEntries = props.objectItem.templateContents.objTemplate.pageEntries;
//   const pageContents = props.objectItem.pageContents.pageContents;
//   const CookieConsentText = JSON.stringify(
//     props.objectItem.CookieConsent.CookieConsent
//   );

//   return (
//     <>
//       <div id="wrapperHeader" className="wrapperHeader">
//         <Entries entries={bodyEntries} />
//       </div>
//       <div id="pageWrapper" className="pageWrapper">
//         <Entries entries={pageContents} />
//         <div id="footer-wrapper" className="footer-wrapper">
//           <Entries entries={pageEntries} />
//         </div>
//       </div>
//       {CookieConsentText && (
//         <CookieConsent
//           location={"bottom"}
//           cookieName="legal"
//           disableStyles={true}
//         >
//           <div
//             dangerouslySetInnerHTML={{ __html: CookieConsentText["value"] }}
//           ></div>
//         </CookieConsent>
//       )}
//     </>
//   );
// }

// export default Template;
