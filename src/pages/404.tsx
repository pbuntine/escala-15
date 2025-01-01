import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function FourOhFour() {
  //
  // What page is this?
  // ==================
  const router = useRouter();
  const path = router.asPath;

  console.log("path in 404 is:");
  console.log(path);

  // Dynamic paths do not exist and therefore result in a 404 error.
  // But you can navigate to the dynamic path through the app.
  // So here we check whether the path is an existing dynamic route ...
  // ... and forward to it if it is.
  // This typically applies to posts so here we get all post paths: slug + post


  return (
    <div className="wrapper404message">
      <div>404 - Page Not Found</div>
      <Link href="/" className="link404home">
        Go to home page
      </Link>
      <div className="message404">
        It seems that the page you have requested does not exist.
      </div>
    </div>
  );
}
