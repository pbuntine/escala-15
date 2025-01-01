import ReactMarkdown from "react-markdown";
import React from "react";
import Entries from "../entries/prEntries";
import { IescStandardContent } from "../../../types/esc-types";

// Explanation:
// This Standard Content component renders the following:
// - contentTextWrapper containing all Standard Content fields
// - All Entries, the same as scTextAndEntries.tsx ...
//   ... except All Entries are in a DIV.

// div (key)
//   div
//     content
//   /div
//   div
//     entries
//   /div
//   div
//     renderer entries
//   /div
// /div

export default function scSeparateEntries({
  item,
}: {
  item: IescStandardContent;
}) {
  const standardcontentClassNames =
    "scSeparateEntries standard-content " +
    item?.contentClassName +
    " " +
    item?.contentRendererClassName;

  return (
    <div id={item.name} key={item.id} className={standardcontentClassNames}>
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
        <div className="contentEntries">
          <Entries
            entries={item.contentEntries}
            reactComponentPath=""
            section=""
          />
        </div>
      )}
      {Array.isArray(item.contentRendererEntries) && (
        <div className="contentRendererEntries">
          <Entries
            entries={item.contentRendererEntries}
            reactComponentPath=""
            section=""
          />
        </div>
      )}
    </div>
  );
}
