import React from "react";
import DynamicRenderer from "../DynamicRenderer";
import { EntriesProps } from "../../../types/esc-types";

// Explanation:
// This module iterates through arrays of entries sent to it.
// For each entry, it gets the reactComponentPath and ...
// ... sends the entry and reactComponentPath to DynamicRenderer ...
// ... to correctly route the entry to its Renderer.
// Basically all content is delivered from the content model as entries.
// Thus everything goes through this router.
// TODO: This module could be combined with the DynamicRenderer. (???)
// TODO: The reactComponentPath could be a mandatory prop rather than ...
//  ... having to check for it here.
// React Component Path is the path to the React Component that will render the entry.
// ====================
// If reactComponentPath is passed in as a prop, it acts as an override.
// If reactComponentPath is not passed in, it looks for the reactComponentPath in the entry.

// TODO: Change Entry to Entries everywhere.

// https://www.geeksforgeeks.org/how-to-render-an-array-of-objects-in-reactjs/

function Entries({ entries, reactComponentPath, section }: EntriesProps) {
  if (!entries) {
    // console.log("entries are null");
    return <></>;
  }

  try {
    if (!entries.length) {
      // console.log("entries are empty");
      return <></>;
    }
  } catch (error) {
    console.log("Entries error");
    console.log(error);
    return <></>;
  }

  const renderedEntries = entries.map((item, index) => {
    let strreactComponentPath = null;
    if (reactComponentPath) {
      strreactComponentPath = reactComponentPath;
      // console.log("Received reactComponentPath");
    } else {
      if (item?.reactComponentPath) {
        strreactComponentPath = item.reactComponentPath;
      } else {
        console.log(
          "%c This entry is missing a reactComponentPath: ",
          "background: #F00; color: #FFF;"
        );
        return <></>;
      }
    }
    if (!item) {
      console.log("item has a problem!!!");
    }
    if (!section) {
      section = "";
    }
    const indexKey = section + index;
    // console.log(indexKey);

    return (
      <DynamicRenderer
        item={item}
        reactComponentPath={strreactComponentPath}
        key={indexKey}
      />
    );
  });

  return <>{renderedEntries}</>;
}

export default Entries;
