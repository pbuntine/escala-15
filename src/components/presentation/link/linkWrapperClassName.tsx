import Link from "next/link";
import React from "react";
import Entries from "../entries/prEntries";
import { IescLink } from "../../../types/esc-types";
import { Ientry } from "../../../types/esc-types";

// Note: any entries will be rendered in the link.

export default function LinkWrapperClassName({ item }: { item: IescLink }) {
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

  const linkClassNames = `LinkWrapperClassName linkWrapper ${item?.linkClassName} ${item?.linkRendererClassName}`;
  return (
    <div id={item.name} key={item.id} className={linkClassNames}>
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
        {item.linkTitle && (
          <div className="label" aria-label={item.ariaLabel && item.ariaLabel}>
            {item.linkTitle}
          </div>
        )}
      </Link>
    </div>
  );
}
