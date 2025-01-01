// import CookieConsent from 'react-cookie-consent';
// import Entries from "../entries/prEntries";

// function StandardTemplate(props) {
// // This will function creates the page structure.
// // CSS handles the placements and styling.
// // Most content is made up of entries - so this is called for each section of the page.
//   return(
//     <>
//       <div id="wrapperHeader" className="wrapperHeader">
//         <Entries entries={props.templateProps.bodyEntries}/>
//       </div>
//       <div id="pageWrapper" className="pageWrapper">
//         <Entries entries={props.pageContents}/>
//         <div className="footer-wrapper">
//           <Entries entries={props.templateProps.pageEntries}/>
//         </div>
//       </div>
//       {props.CookieConsent && <CookieConsent location={"bottom"} cookieName="legal" disableStyles={true}>
//         <div dangerouslySetInnerHTML={{ __html: props.CookieConsent["value"] }}></div>
//       </CookieConsent>}
//     </>
//   );
// }

// export default StandardTemplate;
