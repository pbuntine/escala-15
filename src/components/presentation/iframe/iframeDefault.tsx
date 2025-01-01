import React from "react";
import ReactMarkdown from "react-markdown";
import Entries from "../entries/prEntries";
import { Iiframe } from "../../../types/esc-types";

// iframeDefault is a default iframe renderer
// it renders an iframe with the following properties:
// - width, height, title, src, options
// it does not render any other properties
// - eg. Entries or Images



export default function iframeDefault({ item }: { item: Iiframe }) {
  console.log("iframeDefault item: ", item);

  const iframe = `<iframe width = ${item.iframeWidth}
                      height=${item.iframeHeight}
                      title = ${item.iframeTitle}
                      src=${item.iframeSource}
                      ${item?.iframeOptions} />`;
  return (
    <div id={item.name} key={item.id} className={item?.iframeClassNames}>
      <div className="contentTextWrapper" key={item.contentName}>
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
      {Array.isArray(item.contentEntries) && <Entries entries={item.contentEntries} />}
      <div dangerouslySetInnerHTML={{ __html: iframe }}></div>
    </div>
  );
}
