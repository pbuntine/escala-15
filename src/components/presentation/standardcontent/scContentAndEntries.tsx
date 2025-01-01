import React from "react";
import ReactMarkdown from "react-markdown";
import Entries from "../entries/prEntries";
import { IescStandardContent } from "../../../types/esc-types";


// Explanation:
// Just like scSeparateContentEntriesAndRendererEntries ...
// ...  with Content separated inside contentTextWrapper ...
// ...  but with no renderer entries.
// TODO: Necessary - or replace and delete???

// div (key)
//   content
//   entries
// /div

export default function scEntriesInsideContentWrapper({ item }: { item: IescStandardContent }) {
  const standardcontentClassNames =
    "contentTextWrapper standard-content " +
    item?.contentClassName +
    " " +
    item?.contentRendererClassName;

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
        <div className="contentEntries">
          <Entries entries={item.contentEntries} />
        </div>
      )}
    </div>
  );
}
