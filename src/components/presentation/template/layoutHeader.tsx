import React from "react";
import Entries from "../entries/prEntries";
import { HamburgerContextProvider } from "../context/contextHamburger";
import { ContentsProps } from "../../../types/esc-types";

function Header({ contents }: Readonly<ContentsProps>) {
  // This will function creates the page structure.
  // CSS handles the placements and styling.
  // Most content is made up of entries - so this is called for each section of the page.
  
  return (
    <HamburgerContextProvider>
      <div id="wrapperHeader" className="wrapperHeader" key="wrapperHeader">
        <Entries entries={contents} reactComponentPath="" section="wrapperHeader"/>
      </div>
    </HamburgerContextProvider>
  );
}

export default Header;
