import React from "react";
import Image from "next/image";

export default function BodySpinner() {
  // TODO: Add dynamic spinner from CMS
  // TODO: Add error handling
  return (
    <div className="wrapperSpinner">
      <Image
        className="contentimageSpinner"
        src="https://images.ctfassets.net/g6xizpw08p1h/4wggRXFOoVXwPInwYZoU5H/3e2540331c16e57231e225ee9c42a5fc/ZKZg.gif"
        alt="loading"
        width="48"
        height="48"
      />
    </div>
  );
}

// TODO:
// https://contactmentor.com/how-to-add-loading-spinner-react-js/
