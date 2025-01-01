import Link from "next/link";
import React from "react";
import Entries from "../entries/prEntries";
import { IescLink } from "../../../types/esc-types";
import { Ientry } from "../../../types/esc-types";

// <Link>
//   Entries
//   Label
// </Link>

export default function LinkDefault({ item }: { item: IescLink }) {
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

  const linkClassNames = `LinkDefault linkWrapper ${item?.linkClassName} ${item?.linkRendererClassName}`;
  //
  return (
    <Link
      id={item.name}
      key={item.id}
      href={linkTarget}
      className={linkClassNames}
      target={item.linkExternalTarget && "_blank"}
      as={linkTarget}
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
  );
}
