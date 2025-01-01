import { IImage } from "../../../types/cf-types"

export function transformImage(entry: IImage) {
  const imageEntry = {
    reactComponentPath: entry.fields.renderer?.fields?.reactComponentPath || null,
    id: entry.sys.id,
    name: entry.fields?.name,
    contentType: entry.sys.contentType.sys.id,
    imageName: entry.fields?.name,
    imageURL: "https:" +entry.fields?.image?.fields?.file?.url || null,
    imageWidth: entry.fields?.width || null,
    imageHeight: entry.fields?.height || null,
    imageAlt: entry.fields?.alt || null,
    imagePriority: entry.fields?.priority || null,
    imageConversion: entry.fields?.conversion || null,
    imageCaption: entry.fields?.caption || null,
    imageClassName: entry.fields?.className || "",
    imageID: entry.fields?.id || null,
    imageRendererID: entry.fields.renderer?.sys.id || null,
    imageRendererReactComponentPath: entry.fields.renderer?.fields?.reactComponentPath || null,
    imageRendererClassName: entry.fields.renderer?.fields?.className || "",
    imageRendererACL: entry.fields.renderer?.fields?.acl || null,
  }
  return imageEntry
}
