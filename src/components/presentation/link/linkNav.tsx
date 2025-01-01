import Link from "next/link";
import React from "react";
import Entries from "../entries/prEntries";
import { useRouter } from "next/router";
import { IescLink } from "../../../types/esc-types";
import { Ientry } from "../../../types/esc-types";
import { useHamburgerContext } from "../context";

// Explanation:
// This component renders top nav links and uses the ActiveNavLinkContextProvider to know which link was selected, so that it can set it as the active link.
// It is dynamically called (via entries) by scNavigationContext using the reactComponentPath specied in the links renderer.
// It is src/presentation/standardcontent/scNavigationContext.tsx that contains the ActiveNavLinkContextProvider

// TODO: Can active link be determined by checking the current URL instead of the Context?
// TODO: Get the showDropDownNav to close the dropdown when a link is clicked

export default function LinkNav({ item }: { item: IescLink }) {
  const router = useRouter();
  const path = router.asPath;
  const { setDropDownNav } = useHamburgerContext();

  let linkTarget = "/";

  if (item.linkInternalTarget) {
    linkTarget = item.linkInternalTarget + "/";
  }
  if (item.linkExternalTarget) {
    linkTarget = item.linkExternalTarget;
  }

  let linkClassNames = `LinkNav linkWrapper ${item?.linkClassName} ${item?.linkRendererClassName}`;
  if (linkTarget === path) {
    linkClassNames = linkClassNames + " active";
  }

  const handleClick = () => {
    setDropDownNav(false);
  };

  return (
    <div id={item.name} key={item.id} className={linkClassNames}>
      <Link legacyBehavior href={linkTarget}>
        <a className={linkClassNames} onClick={handleClick}>
          {item.linkEntries && (
            <Entries
              entries={item.linkEntries as Ientry[]}
              reactComponentPath=""
              section=""
            />
          )}
          {item.linkTitle && item.linkTitle}
        </a>
      </Link>
    </div>
  );
}
