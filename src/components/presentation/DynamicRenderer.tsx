import React from "react";
import dynamic from "next/dynamic";
import { DynamicRendererProps } from "../../types/esc-types";

interface DynamicComponentProps {
  item: unknown;
}

type DynamicComponentType = React.ComponentType<DynamicComponentProps>;
// TODO: What happens if the reactComponentPath doesn't exist?



export default function DynamicRenderer({ item, reactComponentPath }: DynamicRendererProps) {
  // https://nextjs.org/docs/advanced-features/dynamic-import

  // https://stackoverflow.com/questions/62942727/dynamic-importing-of-an-unknown-component-nextjs

  let DynamicComponent: DynamicComponentType;
  // https://stackoverflow.com/questions/62942727/dynamic-importing-of-an-unknown-component-nextjs
  try {
    DynamicComponent = dynamic(() => import(`${reactComponentPath}`), {
      ssr: false,
    });
  } catch (error) {
    console.log("DynamicRenderer error");
    console.log(error);
    return <></>;
  }

  //

  // const DynamicComponent = useMemo(
  //   () =>
  //     dynamic(() => import(`${reactComponentPath}`), {
  //       ssr: false,
  //     })

  //     ,
  //   [reactComponentPath]

  // );

  return <DynamicComponent {...{ item }} />;
}
