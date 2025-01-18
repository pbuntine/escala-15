import { transformEntries } from "./trEntries";
import { IPost } from "../../types/cf-types";

export function transformPostCategory(entry: IPost) {
  let postCategoryEntries = [];

  if (entry.fields.entries?.length) {
    postCategoryEntries = transformEntries(entry.fields.entries);
  } else {
    postCategoryEntries = null;
  }
  
  // If there are no postEntries, it returns sys info, which you do not want.
  let rendererEntries = null;
  if (entry.fields.renderer?.fields?.entries?.length) {
    rendererEntries = transformEntries(entry.fields.renderer?.fields?.entries);
  } else {
    rendererEntries = null;
  }

  const postCategoryEntry = {
    reactComponentPath:entry.fields.renderer?.fields?.reactComponentPath,
    id: entry.sys.id,
    postCategoryName: entry.fields?.name,
    postCategoryTitle: entry.fields.title || null,
    postCategorySubtitle: entry.fields.subtitle || null,
    postCategoryText: entry.fields.text || null,
    postCategoryACL: entry.fields.acl || null,
    postCategoryID: entry.fields.id || null,
    postCategoryClassName: entry.fields.className || "",
    postCategoryRendererID: entry.fields.renderer?.sys.id || null,
    postCategoryRendererClassName: entry.fields.renderer?.fields?.className || null,
    postCategoryRendererACL: entry.fields.renderer?.fields?.acl || null,
    postCategoryRendererEntries: rendererEntries || null,
    postCategoryEntries: postCategoryEntries || null,
  };
  return postCategoryEntry;
}
