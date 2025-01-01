import React from "react";
import Entries from "../entries/prEntries";
import { IfooterEntries } from "../../../types/esc-types";

// Explanation:
// This function is hardcoded in index.tsx to render the entries in the Footer Entries field.
// The Footer Entries field is a multi-entry field.  What goes in it is up to the content editor.
// But the following is a typical expected - for which there is corresponding CSS entries:
// - mainFooter
//    - footerNavLogo
//    - footer-links-block
//      - footer-links-block-title
//      - footer-links
// - footerBase
//    - copyRight



function Footer(footerEntries: IfooterEntries) {
  // This will function creates the page structure.
  // CSS handles the placements and styling.
  // Most content is made up of entries - so this is called for each section of the page.

  return (
    <>
      <div id="wrapperFooter" className="wrapperFooter">
        <Entries
          entries={footerEntries.contents}
          reactComponentPath=""
          section="wrapperFooter"
        />
      </div>
    </>
  );
}

export default Footer;
