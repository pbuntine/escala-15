import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Entries from "../entries/prEntries";
import { fetchCFJSON } from "../../extraction/contentful/fetchCFData";
import { transformEntries } from "../../transformation/contentful/trEntries";
import { useRouter } from "next/router";
import React from "react";

// Explanation:
// This Standard Content component:
//  - Gets the postCategories for the parent [slug].
//  - Renderers headings and anything else provided in the entry - above the list of categories.

export default function PostCategoryListing({ item }) {
  // https://nextjs.org/docs/basic-features/data-fetching/client-side

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  let path = router.asPath;
  path = path.split("/")[1];

  useEffect(() => {
    setLoading(true);
    fetchCFJSON({
      contentType: "postCategory",
      limit: 100,
      include: 5,
      order: "fields.sortOrder",
      slugParent: path,
    }).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [path]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No categories</p>;

  const postCategories = transformEntries(data.items, "");

  const standardcontentClassNames =
    "standard-content " +
    item?.contentClassName +
    " " +
    item?.contentRendererClassName;

  return (
    <div id={item.name} key={item.id} className={standardcontentClassNames}>
      <div className="contentTextWrapper">
        {item.contentTitle && (
          <div className="postCategoryList-title">
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
      {item.contentEntries && (
        <Entries entries={item.contentEntries} reactComponentPath="" />
      )}
      <div className="postCategoriesList">
        {postCategories && (
          <Entries entries={postCategories} reactComponentPath="" />
        )}
      </div>
    </div>
  );
}
