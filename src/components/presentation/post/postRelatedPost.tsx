import Link from "next/link";
import Image from "next/image";
import { IescPost } from "../../../types/esc-types";

// Explanation:
// This is called for each related post from the likes of:
// - postDefault (via Entries);
// For displaying posts related to a currently viewed post.
// Very cut down.  Just the Image, Title and Date.

export default function RelatedPost({ item }: { readonly item: IescPost }) {
  // Convert object array into an array object ...
  //  ... in order to be able to reference its properties using array methods.
  // TODO: Only pass array objects to this,

  const post = item;

  const postClassNames =
    "relatedPost " + post?.postClassName + " " + post?.postRendererClassName;

  const postURL = "/" + post?.postSlugParent + "/" + post?.postSlug;
  // TODO: Remove hardcoding of image sizes!!
  let imageSourceSummary = "";
  if (post?.postPrimaryImage) {
    imageSourceSummary =
      "https:" + post?.postPrimaryImage + "?fm=webp&w=541&h=343";
  }

  // TODO Why is this called 100s of times when it should just be called - like 3????
  // console.log("%c Here !!!", "background: #00FF00;");

  return (
    <Link
      id={item.name}
      key={item.id}
      className={postClassNames}
      href={postURL}
    >
      <Image
        className="relatedPostPrimaryImage"
        alt={post?.postPrimaryImageAltText ?? "image"} // TODO: not actually correct!
        src={imageSourceSummary}
        width="364"
        height="205"
      />
      <div className="relatedPostTitle">{post?.postTitle}</div>
      <div className="relatedPostDate">{post?.postDate}</div>
    </Link>
  );
}
