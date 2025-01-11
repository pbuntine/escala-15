import { transformEntries } from "./trEntries";
import { IStandardcontent } from "../../types/cf-types";

export function transformStandardContent(entry: IStandardcontent) {
  const classNames =
    entry.fields.renderer?.sys.id +
    " standard-content " +
    entry?.fields?.className +
    " " +
    entry.fields.renderer?.fields?.className;

  if (!entry.fields?.renderer?.fields?.reactComponentPath) {
    console.log("Standard Content missing reactComponentPath");
    console.log(entry);

    return null;
  }

  let contentEntries = [];
  if (entry.fields?.entries?.length) {
    contentEntries = transformEntries(entry.fields.entries);
  }
  // If there are no contentEntries, it returns sys info, which you do not want.

  let rendererEntries = [];
  if (entry.fields?.renderer?.fields?.entries?.length) {
    rendererEntries = transformEntries(entry.fields.renderer?.fields?.entries);
  }

  const standardcontentEntry = {
    reactComponentPath:
      entry.fields.renderer?.fields?.reactComponentPath || null,
    id: entry.sys.id,
    name: entry.fields?.name,
    contentType: entry.sys.contentType.sys.id,
    contentName: entry.fields?.name,
    contentTitle: entry.fields.title || null,
    contentSubtitle: entry.fields.subtitle || null,
    contentText1: entry.fields.text1 || null,
    contentText2: entry.fields.text2 || null,
    contentACL: entry.fields.acl,
    contentID: entry.fields.id || null,
    contentClassName: entry.fields.className || "",
    contentRendererID: entry.fields.renderer?.sys.id || null,
    contentRendererClassName: entry.fields.renderer?.fields?.className || "",
    contentRendererACL: entry.fields.renderer?.fields?.acl || null,
    contentRendererEntries: rendererEntries || null,
    contentEntries: contentEntries || null,
    standardcontentClassNames: classNames,
  };
  return standardcontentEntry;
}