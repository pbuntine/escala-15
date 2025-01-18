import ReactMarkdown from "react-markdown";
import React from "react";
import Entries from "../entries/prEntries";
import router from "next/router";

// Explanation:
// Specifically for Post landing pages.
// This one displays the filter param in the URI after the Title - if it exists.
// This Standard Content component renders the following:
// - contentTextWrapper containing all Standard Content fields
// - All Entries, the same as scTextAndEntries.tsx ...
//   ... except All Entries are in a DIV.

// TODO: There might be a way of moving this functionality to a sub-component (????)

// div (key)
//   div
//     content
//   /div
//   div
//     entries
//   /div
// /div

// This is a copy of scSeparateEntries.tsx.
// TODO: Move this to ../post/.

export default function scPostListingWrapper({ item }) {
  let filter = "";
  if (router.query.filter) {
    filter = " - " + router.query.filter;
  } else {
    filter = " - All";
  }

  const standardcontentClassNames =
    "scPostListingWrapper standard-content " +
    item?.contentClassName +
    " " +
    item?.contentRendererClassName;


    console.log("scPostListingWrapper: ", item);
    
  return (
    <div id={item.name} key={item.id} className={standardcontentClassNames}>
      <div className="contentTextWrapper">
        {item.contentTitle && (
          <div className="title">
            <span>
              {item?.contentTitle}
              {filter}
            </span>
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
      {item.contentEntries && (
        <div className="contentEntries">
          <Entries entries={item.contentEntries} />
        </div>
      )}
    </div>
  );
}
