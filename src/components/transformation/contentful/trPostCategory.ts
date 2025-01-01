import { transformEntries } from "./trEntries";
import { IPost } from "../../types/cf-types";

export function transformPostCategory(entry: IPost) {
  let postcategoryEntries = [];

  if (entry.fields.entries?.length) {
    postcategoryEntries = transformEntries(entry.fields.entries);
  } else {
    postcategoryEntries = null;
  }
  
  // If there are no postEntries, it returns sys info, which you do not want.
  let rendererEntries = null;
  if (entry.fields.renderer?.fields?.entries?.length) {
    rendererEntries = transformEntries(entry.fields.renderer?.fields?.entries);
  } else {
    rendererEntries = null;
  }

  const postcategoryEntry = {
    reactComponentPath:entry.fields.renderer?.fields?.reactComponentPath,
    id: entry.sys.id,
    postcategoryName: entry.fields?.name,
    postcategoryTitle: entry.fields.title || null,
    postcategorySubtitle: entry.fields.subtitle || null,
    postcategoryText: entry.fields.text || null,
    postcategoryACL: entry.fields.acl || null,
    postcategoryID: entry.fields.id || null,
    postcategoryClassName: entry.fields.className || "",
    postcategoryRendererID: entry.fields.renderer?.sys.id || null,
    postcategoryRendererClassName: entry.fields.renderer?.fields?.className || null,
    postcategoryRendererACL: entry.fields.renderer?.fields?.acl || null,
    postcategoryRendererEntries: rendererEntries || null,
    postcategoryEntries: postcategoryEntries || null,
  };
  return postcategoryEntry;
}
