import { IIframe } from "../../../types/cf-types";


export function transformIframe(entry: IIframe & { fields: { renderer?: { sys: { id: string }, fields?: { className?: string, reactComponentPath?: string, acl?: string } }, className?: string, width?: string, height?: string, title?: string, source?: string, options?: string, name?: string, acl?: string, id?: string } }) {
  const classNames =
    entry.fields.renderer?.sys.id +
    " iframe " +
    entry?.fields?.className +
    " " +
    entry.fields.renderer?.fields?.className;

  // const iframe = `<iframe width = ${entry.fields?.width}
  //   height=${entry.fields?.height}
  //   title = ${entry.fields?.title}
  //   src=${entry.fields?.source}
  //   ${entry.fields?.options} />`;

  const iframeEntry = {
    reactComponentPath:
      entry.fields.renderer?.fields?.reactComponentPath || null,
    id: entry.sys.id,
    name: entry.fields?.name,
    contentType: entry.sys.contentType.sys.id,
    iframeName: entry.fields?.name,
    iframeTitle: entry.fields.title || null,
    iframeWidth: entry.fields.width || null,
    iframeHeight: entry.fields.height || null,
    iframeSource: entry.fields?.source,
    iframeOptions: entry.fields.options || null,
    iframeACL: entry.fields.acl,
    iframeID: entry.fields.id || null,
    iframeClassNames: classNames,
    iframeRendererID: entry.fields.renderer?.sys.id || null,
    iframeRendererClassName: entry.fields.renderer?.fields?.className || null,
    iframeRendererACL: entry.fields.renderer?.fields?.acl || null,
  };

  return iframeEntry;
}
