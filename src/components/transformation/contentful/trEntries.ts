import { transformImage } from "./trImage";
import { transformLink } from "./trLink";
import { transformStandardContent } from "./trStandardContent";
import { transformPostCategory } from "./trPostCategory";
import { transformPostSummary, transformPost } from "./trPost";
import { transformIframe } from "./trIframeEntry";
import { IIframe } from "../../../types/cf-types";

import { Entry } from 'contentful';

export function transformEntries(entries: Entry[], transformation?: string) {
  // Iterate through the CF Entries, ...
  //  ... transforming the Entries into optimised arrays for rendering.
  // The sources of arrays of entries include:
  //  - Template - Entries
  //  - PageContent Entries
  //  - or Entries within these.

  // The content types can be:
  //  - StandardContent
  //  - Images
  //  - Links
  //  - Forms
  //  - other Entries

  // The items may be provided in a mixed order.  Order doesn't matter ...
  //  ... but might as well return them in the same order.
  // Iterate through and call the necessary parser for the particular type.

  // Process an array of entries
  let selectedTransformation = "";
  const Entries: unknown[] = [];
  entries.forEach((entry, index) => {
    if (transformation) {
      selectedTransformation = transformation;
    } else if (entry?.sys.contentType?.sys.id) {
      selectedTransformation = entry?.sys.contentType?.sys.id;
    } else {
      console.log(
        "%c This entry does not have a valid Content Type.",
        "background: #FF0000; color: #FFF;"
      );
      console.log(entry);
      return null;
    }


    // ContentTypes can have Entries of the following types:
    //  - standardcontent
    //  - links
    //  - images
    switch (selectedTransformation) {
      case "standardcontent":
        Entries[index] = transformStandardContent(entry);
        break;
      case "image":
        Entries[index] = transformImage(entry);
        break;
      case "link":
        Entries[index] = transformLink(entry);
        break;
      case "iframe":
        Entries[index] = transformIframe(entry as IIframe & { fields: { renderer?: { sys: { id: string; }; fields?: { className?: string; reactComponentPath?: string; acl?: string; }; }; className?: string; width?: string; height?: string; title?: string; source?: string; options?: string; name?: string; acl?: string; id?: string; }; });
        break;
      case "postCategory":
        Entries[index] = transformPostCategory(entry);
        break;
      case "post":
        Entries[index] = transformPost(entry);
        break;
      case "postSummary":
        Entries[index] = transformPostSummary(entry);
        break;
      default:
        // console.log(
        //   "This entry has a Content Type that is not currently handled by trEntries.tsx !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        // );
        // console.log(entry);
        break;
    }

    return Entries[index];
  });

  return Entries;
}
