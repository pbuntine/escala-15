import Link from "next/link";
import Entries from "../entries/prEntries";
import Image from "next/image";
import router from "next/router";
import { Ientry, IescPost } from "../../../types/esc-types";

// Explanation:
// This is called for each post from:
// - scPostsListing (via Entries); and
// A post summary for dispolaying in a list.
// Similar to Related Posts.
// Excludes detail like Entries and Related Posts.

// TODO: Replace hardcoded Arrow up right!!!

export default function Post({ item }: { readonly item: IescPost }) {
  const post = item;

  let filter = "";
  if (router.query.filter) {
    filter = "?filter=" + router.query.filter;
  }

  const postClassNames =
    "post " + post?.postClassName + " " + post?.postRendererClassName;

  const postURL = "/" + post?.postSlugParent + "/" + post?.postSlug + filter;
  // TODO: Remove hardcoding of image sizes!!
  let imageSourceSummary = "";
  if (post?.postPrimaryImage) {
    imageSourceSummary =
      "https:" + post?.postPrimaryImage + "?fm=webp&w=541&h=343";
  }

  // TODO: This is a hack.  Get rid of hardcoded arrow!!
  // TODO: This is a hack.  Get rid of hardcoded sizes!!
  return (
    <Link
      id={item.name}
      key={item.id}
      className={postClassNames}
      href={postURL}
    >
      <div id={post?.postName} className="postSummary" key={post?.postName}>
        <Image
          className="postPrimaryImage"
          alt={post?.postPrimaryImageAltText ?? "Default alt text"}
          src={imageSourceSummary}
          width="541"
          height="343"
        />
        <div className="postSummaryTextWrapper">
          <div className="postTitle">{post?.postTitle}</div>
          {post?.postSubtitle && (
            <div className="postSubtitle">{post?.postSubtitle}</div>
          )}
          <div className="postListCategories">
            {post.postCategories && (
              <Entries
                entries={post.postCategories as Ientry[]}
                reactComponentPath=""
                section=""
              />
            )}
          </div>
          <div className="postDate">{post?.postDate}</div>
          <div className="postDescription">{post?.ogDescription}</div>
        </div>
      </div>
      <div className="read-more replace-me">
        <Image
          width="27"
          height="27"
          alt="Arrow up right"
          src="https://images.ctfassets.net/g6xizpw08p1h/4uSTvT5LuzvE0LN5JdhtCd/c7e920d602c17c166b3012528d0ec305/Upward_arrow_Rityta_1.svg"
        />
      </div>
    </Link>
  );
}
