import ReactMarkdown from "react-markdown";
import Entries from "../entries/prEntries";
import Image from "next/image";
import React from "react";
import { IescPost , Ientry } from "../../../types/esc-types";

// Explanation:
// This is called for each post by the DynamicRenderer from:
// - reactComponentPath in rendererPost related to each Post.
// For displaying full Post details, including:
// - Related Posts.
// - Additional entries.

export default function DefaultPost({ item }: Readonly<{ item: IescPost }>) {
  // TODO: Remove hardcoding of image sizes!!
  let imageSourceDetail = "";
  if (item?.postPrimaryImage) {
    imageSourceDetail =
      "https:" + item?.postPrimaryImage + "?fm=webp&w=1800&h=1200";
  }

  return (
    <div id={item.name} key={item.id} className={item.postClassNames}>
      <div id={item?.name} key={item?.id} className="contentTextWrapper">
        {/* <div id="postDate" className="postDate">
          {item?.postDate}
        </div> */}
        <div className="postTitle">{item?.postTitle}</div>
        <div className="postSubtitle">{item?.postSubtitle}</div>
        <div className="postAuthor">{item?.postAuthor}</div>
        <Image
          className="postPrimaryImage"
          alt={item?.postPrimaryImageAltText ?? "image"}
          src={imageSourceDetail}
          width="1800"
          height="1200"
          priority
        />{" "}
        <div className="postCategories">
          {item.postCategories && (
            <Entries
              entries={item.postCategories as Ientry[]}
              reactComponentPath=""
              section=""
            />
          )}
        </div>
        <div className="postDescription">{item?.ogDescription}</div>
        {item?.postText && (
          <div className="postText">
            <ReactMarkdown>{item?.postText}</ReactMarkdown>
          </div>
        )}
      </div>
      {item.postRelatedPosts && (
        <div className="relatedPostsSectionWrapper">
          <div className="relatedPostsTitle">Related Posts</div>
          <div className="relatedPostsWrapper">
            <Entries
              entries={item.postRelatedPosts as Ientry[]}
              reactComponentPath="./post/postRelatedPost"
              section="relatedPosts"
            />
          </div>
        </div>
      )}
      <div className="postEntries">
        {item.postEntries && (
          <Entries
            entries={item.postEntries as Ientry[]}
            reactComponentPath=""
            section=""
          />
        )}
      </div>
    </div>
  );
}
