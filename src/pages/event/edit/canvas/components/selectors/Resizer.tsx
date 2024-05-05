import { useNode, useEditor, Node } from "@craftjs/core";
import cx from "classnames";
import { Resizable } from "re-resizable";
import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import {
  isPercentage,
  pxToPercent,
  percentToPx,
  getElementDimensions,
} from "../../utils/numToMeasurement";

interface IndicatorsProps {
  bound?: "row" | "column";
}

const Indicators = styled.div<IndicatorsProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 12px -1px rgba(0, 0, 0, 0.25);
    border: 2px solid #36a9e0;
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

interface ResizerProps {
  propKey: { width: string; height: string };
  children: React.ReactNode;
  [key: string]: any;
}

interface NodeInfo {
  nodeWidth: string;
  nodeHeight: string;
  fillSpace: string;
  parentDirection: string;
  isRootNode: boolean;
}

export const Resizer = ({ propKey, children, ...props }: ResizerProps) => {
  const {
    id,
    actions: { setProp },
    connectors: { connect },
    nodeWidth,
    nodeHeight,
    fillSpace,
    parentDirection,
    isRootNode,
  } = useNode<NodeInfo>((node) => ({
    nodeWidth: node.data.props[propKey.width],
    nodeHeight: node.data.props[propKey.height],
    fillSpace: node.data.props.fillSpace,
    parentDirection: node.data.props.flexDirection,
    isRootNode: node.id === "ROOT",
  }));

  const resizableRef = useRef<Resizable>(null);
  const [dimensions, setDimensions] = useState({
    width: nodeWidth,
    height: nodeHeight,
  });

  const updateDimensions = useCallback(
    (width: string, height: string) => {
      const newWidth = isPercentage(nodeWidth)
        ? `${pxToPercent(
            width,
            getElementDimensions(resizableRef.current?.parentNode!).width
          )}%`
        : `${width}px`;
      const newHeight = isPercentage(nodeHeight)
        ? `${pxToPercent(
            height,
            getElementDimensions(resizableRef.current?.parentNode!).height
          )}%`
        : `${height}px`;
      setProp((props: any) => {
        if (!isRootNode) {
          props[propKey.width] = newWidth;
        }
        props[propKey.height] = newHeight;
      });
      if (isRootNode) {
        setDimensions({ width: width, height: newHeight });
      } else {
        setDimensions({ width: newWidth, height: newHeight });
      }
    },
    [setProp, propKey]
  );

  useEffect(() => {
    // Make sure the ref is correctly attached to a DOM element
    if (resizableRef.current && resizableRef.current.resizable) {
      connect(resizableRef.current.resizable);
    }
  }, [connect]);

  return (
    <Resizable
      ref={resizableRef}
      size={{ width: dimensions.width, height: dimensions.height }}
      onResizeStop={(e, direction, ref, d) => {
        const width = ref.style.width;
        const height = ref.style.height;

        updateDimensions(width, height);
      }}
      className={cx({ "m-auto": isRootNode, flex: true })}
      {...props}
    >
      {children}
      {!isRootNode && (
        <Indicators
          bound={fillSpace ? (parentDirection as "row" | "column") : undefined}
        >
          <span />
          <span />
          <span />
          <span />
        </Indicators>
      )}
    </Resizable>
  );
};
