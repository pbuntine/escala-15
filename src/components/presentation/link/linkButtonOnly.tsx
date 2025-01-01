// TODO: Only covering internalTarget.  Must handle externalTarget also.
// Note the button does nothing!  It also doesn't handle images.
import React from "react";
import { IescLink } from "../../../types/esc-types";

export default function LinkButtonOnly({ item }: { item: IescLink }) {
  // Consider a functional approach to the switch statement.
  // If there is an internal link, use it.
  // If there is an external link, use that.
  // If there is neither, direct to the root of the application.
  // var linkTarget = "/";
  // if (item.linkInternalTarget) {
  //   linkTarget = item.linkInternalTarget;
  // }
  // if (item.linkExternalTarget) {
  //   linkTarget = item.linkExternalTarget;
  // }
  // let linkTarget = {item.linkEntries && item.linkEntries[0]};


  const linkClassNames = `linkWrapper ${item?.linkClassName} ${item?.linkRendererClassName}`;
  // target={item.linkExternalTarget && "_blank"}
  return (
    <button
      id={item.name}
      key={item.id}
      className={linkClassNames}
      aria-label={item.linkAriaLabel}
    >
      {item.linkTitle}
    </button>
  );
}
