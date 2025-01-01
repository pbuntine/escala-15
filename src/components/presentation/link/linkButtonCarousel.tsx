// TODO: Only covering internalTarget.  Must handle externalTarget also.
// Note this renderer only handles the first entry - presuming that it is an image!!
import React from "react";
import { IescLink } from "../../../types/esc-types";

export default function LinkButtonOnly({ item }: { readonly item: Readonly<IescLink> }) {
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

  // TODO: This is a hack.  Need to sort out how to use this component for Carousel buttons.

  interface HandleThisClickProps {
    linkTitle: string;
  }

  function handleThisClick(props: HandleThisClickProps) {
    if (props.linkTitle === ">") {
      handleMoveToNextSlide();
    } else {
      handleMoveToPrevSlide();
    }
  }

  const linkClassNames = `linkWrapper ${item?.linkClassName} ${item?.linkRendererClassName}`;
  // target={item.linkExternalTarget && "_blank"}
  return (
    <button
      id={item.name}
      key={item.id}
      className={linkClassNames}
      aria-label={item.linkAriaLabel}
      onClick={() => handleThisClick({ linkTitle: item.linkTitle })}
    >
      {item.linkTitle}
    </button>
  );
}
function handleMoveToNextSlide() {
  throw new Error("Function not implemented.");
}
function handleMoveToPrevSlide() {
  throw new Error("Function not implemented.");
}

