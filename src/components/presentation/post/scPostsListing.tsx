import { useState, useEffect } from "react";
import Entries from "../entries/prEntries";
import { fetchCFJSON } from "../../extraction/contentful/fetchCFData";
import { transformEntries } from "../../transformation/contentful/trEntries";
import BodySpinner from "../spinner/spinnerBody";
import { useRouter } from "next/router";
// import { IPost } from "@/types/cf-types";
import { IescPost } from "@/types/esc-types";
import { Entry } from "contentful";

// TODO:  Display the Categories in this component as well.
// Then use useEffect to call or filter the posts based on postCategory

// Explanation:
// This component is called by the DynamicRenderer ....
// ... when a Standard Content entry with this ...
// ... ReactComponentRenderer is included on a page.

// It dynamically calls CF for the posts with ...
// ... this page as a parent.

export default function PostsListing() {
  // https://nextjs.org/docs/basic-features/data-fetching/client-side
  const [posts, setPosts] = useState<{ items: Entry[] } | null>(null);
  const [isLoading, setLoading] = useState(false);

  // console.log("I am in scPostsListing!!!!!!!!!!!!!!!!!!!!!");

  // To only show the Posts of the page you are on currently, get the path and ...
  // ... filter the Posts query using the slugParent field.
  const router = useRouter();
  const currentSlug = router.asPath;
  // let slugParent = currentSlug.slice(1, -1);
  const slugParent = currentSlug.split("/")[1];

  useEffect(() => {
    setLoading(true);
    fetchCFJSON({
      contentType: "post",
      limit: 100,
      include: 5,
      order: ["fields.sortOrder"], // TODO: Don't think this is right!
      slugParent: slugParent,
    }).then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  }, [slugParent]);

  // TODO:  Not sure why - but this log is called like 100 times when empty.

  if (isLoading) {
    return <BodySpinner />;
  } else if (!posts) {
    return <p>No posts are available...</p>;
  }

  // @ts-expect-error: Need to work out the ts for cfPosts.
  const arrayPosts: Ientry[] = transformEntries(
    posts.items,
    "postSummary"
  ) as IescPost[];

  let filter = "";
  if (router.query.filter) {
    filter = Array.isArray(router.query.filter)
      ? router.query.filter[0]
      : router.query.filter;
  }

  let filteredPosts = [];
  if (filter && filter != "" && filter != "All") {
    filteredPosts = arrayPosts.filter(function (el: {
      postCategoriesList: string[];
    }) {
      return el.postCategoriesList.includes(filter);
    });
  } else {
    filteredPosts = arrayPosts;
  }

  return (
    <div id="postsListing" key="PostsListing" className="postsListing">
      {filteredPosts && (
        <Entries entries={filteredPosts} reactComponentPath="./post/postListing" section="" />
      )}
    </div>
  );
}
