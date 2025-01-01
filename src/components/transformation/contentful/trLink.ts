import { transformEntries } from "./trEntries";
import { ILink } from "../../types/cf-types";

export function transformLink(entry: ILink) {
  let linkEntries = null;
  if (entry.fields.entries?.length) {
    linkEntries = transformEntries(entry.fields.entries);
  } else {
    linkEntries = null;
  }

  const linkInternalTarget = "/" + entry.fields.internalTarget?.fields?.slug;
if (!entry.fields.internalTarget?.fields?.slug) {
  console.warn();
}


const linkEntry = {
    reactComponentPath:
    entry.fields.renderer?.fields?.reactComponentPath || null,
    id: entry.sys.id,
    name: entry.fields?.name,
    contentType: entry.sys.contentType.sys.id,
    linkName: entry.fields?.name,
    linkTitle: entry.fields?.title || null,
    linkAriaLabel: entry.fields?.ariaLabel || null,
    linkEntries: linkEntries || null,
    linkClassName: entry.fields.className || "",
    linkID: entry.fields.id || null,
    linkRendererID: entry.fields.renderer?.sys.id || null,
    linkRendererClassName: entry.fields.renderer?.fields?.className || "",
    linkRendererACL: entry.fields.renderer?.fields?.acl || null,
    linkInternalTarget: linkInternalTarget || null,
    linkExternalTarget: entry.fields.externalTarget || null,
  };
  return linkEntry;
}
