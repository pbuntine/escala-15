import Link from "next/link";
import React from "react";
import Entries from "../entries/prEntries";
import { IescLink } from "../../../types/esc-types";
import { Ientry } from "../../../types/esc-types";

// Explanation of the LinkWrapperNoClassName component
// Having no ClassName seems to help with the styling of the link....
// ...such as borders.
// TODO: Can this be resolved with CSS or logic with linkWrapperClassName?

export default function LinkWrapperNoClassName({ item }: { item: IescLink }) {
  // If there is an internal link, use it.
  // If there is an external link, use that.
  // If there is neither, direct to the root of the application.
  let linkTarget = "/";
  if (item.linkInternalTarget) {
    linkTarget = item.linkInternalTarget;
  }
  if (item.linkExternalTarget) {
    linkTarget = item.linkExternalTarget;
  }

  // let linkWrapperClassNames =
  //   "link " + item?.linkClassName + " " + item?.linkRendererClassName;

  const linkClassNames = `LinkWrapperNoClassName linkWrapper ${item?.linkClassName} ${item?.linkRendererClassName}`;
  // target={item.linkExternalTarget && "_blank"}
  return (
    <div id={item.name} key={item.id} className="noClassName">
      <Link
        href={linkTarget}
        className={linkClassNames}
        target={item.linkExternalTarget && "_blank"}
      >
        {item.linkEntries && (
          <Entries
            entries={item.linkEntries as Ientry[]}
            reactComponentPath=""
            section=""
          />
        )}
        {item.linkTitle && <div className="label">{item.linkTitle}</div>}
      </Link>
    </div>
  );
}
