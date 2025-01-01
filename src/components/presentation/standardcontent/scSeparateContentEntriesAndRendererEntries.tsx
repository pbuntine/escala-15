import ReactMarkdown from "react-markdown";
import React from "react";
import Entries from "../entries/prEntries";
import { IescStandardContent } from "../../../types/esc-types";

// Explanation:
// This Standard Content component renders the following:
// - contentRendererEntries = all Entries of the Renderer each rendered separately ...
//   ... equal to and outside (before) the contentTextWrapper
// - contentTextWrapper = contains all Standard Content fields
// - contentEntries = all Entries each rendered separately ...
//   ... equal to and outside (after) the contentTextWrapper
// TODO: Could replace scSeparateEntries as a superset.

// div (key)
//   renderer entries
//   div
//     content
//   /div
//   entries
// /div

export default function scSeparateContentEntriesAndRendererEntries({
  item,
}: {
  item: IescStandardContent;
}) {
  const standardcontentClassNames =
    "scSeparateContentEntriesAndRendererEntries standard-content " +
    item?.contentClassName +
    " " +
    item?.contentRendererClassName;

  // If it does have a RendererReactComponentPath, lazy load the Renderer and use it.
  // If it doesn't have a RendererReactComponentPath, use the standard renderer.

  // TODO: Pass classNames to Entries to identify them - RendererContent from Content
  return (
    <div id={item.name} key={item.id} className={standardcontentClassNames}>
      {Array.isArray(item.contentRendererEntries) && (
        <Entries
          entries={item.contentRendererEntries}
          reactComponentPath=""
          section=""
        />
      )}
      <div className="contentTextWrapper">
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
      </div>
      {Array.isArray(item.contentEntries) && (
        <Entries
          entries={item.contentEntries}
          reactComponentPath=""
          section=""
        />
      )}
    </div>
  );
}
