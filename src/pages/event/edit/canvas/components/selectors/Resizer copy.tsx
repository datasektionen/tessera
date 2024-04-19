import { useNode, useEditor } from "@craftjs/core";
import cx from "classnames";
import { Resizable } from "re-resizable";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import {
  isPercentage,
  pxToPercent,
  percentToPx,
  getElementDimensions,
} from "../../utils/numToMeasurement";

const Indicators = styled.div<{ bound?: "row" | "column" }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  span {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 12px -1px rgba(0, 0, 0, 0.25);
    border: 2px solid #36a9e0;
    pointer-events: none;
    &:nth-child(1) {
      ${(props) =>
        props.bound === "row"
          ? "left: 50%; top: -5px; transform: translateX(-50%);"
          : "top: 50%; left: -5px; transform: translateY(-50%);"}
    }
    &:nth-child(2),
    &:nth-child(4) {
      display: ${(props) => (props.bound ? "none" : "block")};
    }
    &:nth-child(3) {
      ${(props) =>
        props.bound === "row"
          ? "left: 50%; bottom: -5px; transform: translateX(-50%);"
          : "bottom: 50%; left: -5px; transform: translateY(-50%);"}
    }
  }
`;

export const Resizer = ({ propKey, children, ...props }: any) => {
  const {
    actions: { setProp },
    connectors: { connect },
  } = useNode();

  const resizableRef = useRef<Resizable>(null);

  useEffect(() => {
    // Make sure the ref is correctly attached to a DOM element
    if (resizableRef.current && resizableRef.current.resizable) {
      connect(resizableRef.current.resizable);
    }
  }, [connect]);

  const handleResizeStop = (ref: HTMLElement) => {
    const width = ref.style.width;
    const height = ref.style.height;
    console.log(props, "propkey values", propKey.width, propKey.height);

    if (!propKey.width || !propKey.height) {
      console.warn(
        "You need to provide a propKey object with width and height keys"
      );
    }

    setProp((props: any) => {
      if (props && !props.isRevoked) {
        if (!props["style"]) {
          props["style"] = {};
        }
        props["style"][propKey.width] = width;
        props["style"][propKey.height] = height;
      } else {
        console.warn("The props object has been revoked.");
      }
    });
  };

  return (
    <Resizable
      ref={resizableRef}
      size={{
        width: props["style"][propKey.width],
        height: props["style"][propKey.height],
      }}
      enable={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topLeft: true,
        topRight: true,
        bottomLeft: true,
        bottomRight: true,
      }}
      className={cx("resizable")}
      onResizeStop={(e, direction, ref) => handleResizeStop(ref)}
      {...props}
    >
      {children}
      <Indicators />
    </Resizable>
  );
};
