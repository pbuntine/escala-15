import Image from "next/image";
import React from "react";
import { IimageItem } from "../../../types/esc-types";

export default function DefaultImage({ item }: { item: IimageItem }) {
  const imageClassNames =
    "DefaultImage image " + item?.imageClassName + " " + item?.imageRendererClassName;

  let imageFormat = "";
  if (
    item?.imageConversion !== null &&
    item?.imageConversion !== "Original image format"
  ) {
    imageFormat = item?.imageConversion ?? "";
  }

  const imageSRC =
    item.imageURL +
    "?fm=" +
    imageFormat +
    "&w=" +
    item?.imageWidth +
    "&h=" +
    item?.imageHeight;

  // TODO: Take full advantage of next/image.
  // https://nextjs.org/docs/api-reference/next/image
  // TODO: remove lint rule ignoring this.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/min-width
  // TODO : Optimise Images
  // https://mediajams.dev/post/how-to-optimize-next.js-images

  let tagPriority: "lazy" | "eager" = "lazy";
  if (item?.imagePriority) {
    tagPriority = "eager";
  }

  return (
    <div id={item.imageName} className={imageClassNames} key={item.imageName}>
      <Image
        alt={item.imageAlt}
        src={imageSRC}
        width={item.imageWidth}
        height={item.imageHeight}
        sizes="100vw"
        loading={tagPriority}
      />
    </div>
  );
}
