import ReactMarkdown from "react-markdown";
import React from "react";
import Entries from "../entries/prEntries";
import { IescStandardContent } from "../../../types/esc-types";

// Explanation:
// This Standard Content component renders the following:
// - The first Entry's imageURL as a background image
// - contentTextWrapper = contains all Standard Content fields
// - contentEntries = all Entries each rendered separately ...
//   ... equal to and outside the contentTextWrapper

// div (key)
//   div
//     content
//   /div
//   entries
//   renderer entries
// /div

export default function scTextAndEntries({
  item,
}: {
  item: IescStandardContent;
}) {
  const standardcontentClassNames =
    item.id +
    " " +
    "scBackgroundImage standard-content " +
    item?.contentClassName +
    " " +
    item?.contentRendererClassName;

  // If it does have a RendererReactComponentPath, lazy load the Renderer and use it.
  // If it doesn't have a RendererReactComponentPath, use the standard renderer.

  return (
    <div id={item.name} key={item.id} className={standardcontentClassNames}>
      <style jsx>{`
        #${item.name} {
          background-image: url(${item?.contentEntries?.[0]?.imageURL ?? ''});
          background-repeat: no-repeat;
          -webkit-box-pack: end;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
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
      {Array.isArray(item.contentRendererEntries) && (
        <Entries entries={item.contentRendererEntries} reactComponentPath="" />
      )}
    </div>
  );
}
