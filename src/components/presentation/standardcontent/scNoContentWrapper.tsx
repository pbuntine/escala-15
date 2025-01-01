import ReactMarkdown from "react-markdown";
import React from "react";
import Entries from "../entries/prEntries";
import { IescStandardContent } from "../../../types/esc-types";

// Explanation:
// This Standard Content component renders the following:
// - all Standard Content fields
// - all Entries each rendered separately ...
// All content and entries are equal.

// div (key)
//   content
//   entries
// /div

export default function scNoContentWrapper({
  item,
}: {
  item: IescStandardContent;
}) {
  const standardcontentClassNames =
    "scNoContentWrapper standard-content " +
    item?.contentClassName +
    " " +
    item?.contentRendererClassName;

  // If it does have a RendererReactComponentPath, lazy load the Renderer and use it.
  // If it doesn't have a RendererReactComponentPath, use the standard renderer.

  return (
    <div id={item.name} key={item.id} className={standardcontentClassNames}>
      {item.contentTitle && (
        <div className="title">
          <span>{item?.contentTitle}</span>
        </div>
      )}
      {item.contentSubtitle && (
        <div className="subtitle">
          <span>{item?.contentSubtitle}</span>
        </div>
      )}
      {item.contentText1 && (
        <div className="text1">
          <ReactMarkdown>{item?.contentText1}</ReactMarkdown>
        </div>
      )}
      {item.contentText2 && (
        <div className="text2">
          <ReactMarkdown>{item?.contentText2}</ReactMarkdown>
        </div>
      )}
      {Array.isArray(item.contentEntries) && (
        <Entries entries={item.contentEntries} reactComponentPath="" />
      )}
      {Array.isArray(item.contentRendererEntries) && (
        <Entries entries={item.contentRendererEntries} reactComponentPath="" />
      )}{" "}
    </div>
  );
}
