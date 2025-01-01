import ReactMarkdown from "react-markdown";
import React from "react";
import Entries from "../entries/prEntries";
import { IescStandardContent } from "../../../types/esc-types";

// Explanation:
// This Standard Content component renders the following:
// - contentTextWrapper = contains all Standard Content fields
// - contentEntries =
//   - Link Entries are rendered inside contentTextWrapper
//   - Image Entries are rendered outside of contentTextWrapper

// div (key)
//   div
//     content
//     links
//   /div
//   images
// /div

export default function scLinksInsideTextImagesOutside({ item }: { item: IescStandardContent }) {
  let itemImagesArray = [];

  itemImagesArray =
    Array.isArray(item.contentEntries) ? item.contentEntries.filter((entry) => entry.contentType === "image") : [];

  let itemLinksArray = [];
  itemLinksArray =
    Array.isArray(item.contentEntries) ? item.contentEntries.filter((entry) => entry.contentType === "link") : [];

  const standardcontentClassNames =
    "scLinksInsideTextImagesOutside standard-content " +
    item?.contentClassName +
    " " +
    item?.contentRendererClassName;

  // If it does have a RendererReactComponentPath, lazy load the Renderer and use it.
  // If it doesn't have a RendererReactComponentPath, use the standard renderer.

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
        {item.contentEntries && <Entries entries={itemLinksArray} reactComponentPath={undefined} section={undefined} />}
      </div>
      {item.contentEntries && <Entries entries={itemImagesArray} reactComponentPath={undefined} section={undefined} />}
    </div>
  );
}
