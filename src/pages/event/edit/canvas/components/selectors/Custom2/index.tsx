import { Element, useNode } from "@craftjs/core";
import React, { RefObject } from "react";

import { Container } from "../Container";
import { Video } from "../Video";

export const Custom2VideoDrop = ({ children }: any) => {
  const {
    connectors: { connect },
  } = useNode();

  // @ts-ignore
  const ref: RefObject<HTMLDivElement> | null = connect;
  return (
    <div ref={ref} className="flex-1 ml-5 h-full">
      {children}
    </div>
  );
};
Custom2VideoDrop.craft = {
  rules: {
    canMoveIn: (nodes: any, self: any, helper: any) => {
      return (
        nodes.every((node: any) => node.data.type === Video) &&
        helper(self.id).decendants().length === 0
      );
    },
  },
};
export const Custom2 = (props: any) => {
  return (
    <Container {...props} className="overflow-hidden">
      <div className="w-24">
        <h2 className="text-xs text-white">
          You can only drop
          <br />
          one video here.
        </h2>
      </div>
      <Element canvas is={Custom2VideoDrop} id="wow">
        <Video />
      </Element>
    </Container>
  );
};

Custom2.craft = {
  ...Container.craft,
  displayName: "Custom 2",
};
