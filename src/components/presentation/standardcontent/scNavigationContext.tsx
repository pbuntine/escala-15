import React from "react";
import { useHamburgerContext } from "../context";
import Entries from "../entries/prEntries";
import { IescStandardContent } from "../../../types/esc-types";

// Explanation:
// Just used for main navigation.
// Not that special except it repeats and gives specific classNames.
// TODO: Is it required to be different?

function NavigationContext({ item }: { item: IescStandardContent }) {
  const { showDropDownNav } = useHamburgerContext();

  const topNavClassNames =
    "scNavigationContext topNav " +
    item?.contentClassName +
    " " +
    item?.contentRendererClassName;

  const dropNavClassNames =
    "scNavigationContext dropNav " +
    item?.contentClassName +
    " " +
    item?.contentRendererClassName;

  return (
    <>
      <div
        id="topNavLinksWrapper"
        key="topNavLinksWrapper"
        className={topNavClassNames}
      >
        {Array.isArray(item.contentEntries) && (
          <Entries entries={item.contentEntries} reactComponentPath="" />
        )}
      </div>
      <div
        id="dropNavLinksWrapper"
        key="dropNavLinksWrapper"
        className={dropNavClassNames}
      >
        {showDropDownNav && Array.isArray(item.contentEntries) && (
          <Entries entries={item.contentEntries} reactComponentPath="" />
        )}
      </div>
    </>
  );
}

export default NavigationContext;
