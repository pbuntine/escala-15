import React, { useRef } from "react";
import { useHamburgerContext } from "../context";
import Image from "next/image";
import { IimageItem } from "../../../types/esc-types";

// TODO: Can be modernised like imgDefault.tsx
// TODO: This can be made a general component for all clickable images. 
// TODO: This is a hack.  Need to sort out how to use this component for Hamburger.
export default function ImgOnClick({ item }: { item: IimageItem }) {
  const { showDropDownNav } = useHamburgerContext();
  const { setDropDownNav } = useHamburgerContext();
  // const { width, height } = useWindowDimensions();

  const DropDown = useRef("no");

  function handleClick() {
    setDropDownNav(!showDropDownNav);
    if (DropDown.current === "no") {
      DropDown.current = "yes";
    } else {
      DropDown.current = "no";
    }
    console.log("DropDown");
    console.log(DropDown);
  }

   

  const imageClassNames =
    "image " + item?.imageClassName + " " + item?.imageRendererClassName;

  const tagPriority = "eager";
  // https://nextjs.org/docs/api-reference/next/image
  // then remove lint rule ignoring this.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/min-width

  if (item.imageID === "hamburger") {
    return (
      <div
        id={item.imageName}
        className={imageClassNames}
        key={item.imageName}
      >
        <Image
          alt={item.imageAlt}
          src={item.imageURL}
          width={item.imageWidth}
          height={item.imageHeight}
          sizes="100vw"
          loading={tagPriority}
          onClick={handleClick}
          className={showDropDownNav ? "active-hamburger" : "default-hamburger"}
        />
      </div>
    );
  }
}
