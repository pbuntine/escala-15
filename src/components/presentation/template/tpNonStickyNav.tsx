// import CookieConsent from "react-cookie-consent";
// import Entries from "../entries/prEntries";

// function NonStickyNavTemplate(props) {
//   // Note: Not currently used!!!!
//   // ============================

//   // This will function creates the page structure.
//   // CSS handles the placements and styling.
//   // Most content is made up of entries - so this is called for each section of the page.

//   const entries = props.item.templateContents.entries;
//   const pageContents = props.item.pageContents;

//   // TODO: Get rid of this hardcoding of Footer Entries.
//   // Just the order of Entries will achieve the same thing (?)

//   const mainNav =
//     entries?.find((item) => item.contentName === "mainNav") || null;
//   const wrapperFooter =
//     entries?.find((item) => item.contentName === "mainFooter") || null;
//   const footerCopyright =
//     entries?.find((item) => item.contentName === "footerCopyright") || null;
//   const cookieConsent =
//     entries?.find((item) => item.contentName === "cookieConsent") || null;
//   const CookieConsentText = cookieConsent.contentText1;

//   return (
//     <>
//       <div id="pageWrapper" className="pageWrapper" key="pageWrapper">
//         <div id="wrapperHeader" className="wrapperHeader" key="wrapperHeader">
//           <Entries entries={mainNav.contentEntries} />
//         </div>
//         <Entries entries={pageContents} />
//         <div
//           id="footerWrapperMain"
//           className="footer-wrapper"
//           key="footerWrapperMain"
//         >
//           <div id="wrapperFooter" className="wrapperFooter">
//             <Entries entries={wrapperFooter.contentEntries} />
//           </div>
//           <div
//             id="footerWrapperBase"
//             className="footerBase"
//             key="footerWrapperBase"
//           >
//             <Entries entries={footerCopyright.contentEntries} />
//           </div>
//         </div>
//       </div>
//       {CookieConsentText && (
//         <CookieConsent
//           location={"bottom"}
//           cookieName="legal"
//           disableStyles={true}
//         >
//           <div dangerouslySetInnerHTML={{ __html: CookieConsentText }}></div>
//         </CookieConsent>
//       )}
//     </>
//   );
// }

// export default NonStickyNavTemplate;
