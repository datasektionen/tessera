import { Element, useEditor } from "@craftjs/core";
import { Tooltip } from "@mui/material";
import React from "react";
import styled from "styled-components";

import ButtonIcon from "@mui/icons-material/Apps";
import SquareIcon from "@mui/icons-material/AspectRatio";
import TypeIcon from "@mui/icons-material/TextFields";
import YoutubeIcon from "@mui/icons-material/VideoCall";

import { Button } from "../../selectors/Button";
import { Container } from "../../selectors/Container";
import { Text } from "../../selectors";
import { Video } from "../../selectors/Video";

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : "")}
  ${(props) => (!props.enabled ? `opacity: 0;` : "")}
`;

const Item = styled.a<{ move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className="toolbox transition w-12 h-full flex flex-col bg-white"
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        <div
          ref={(ref) =>
            create(
              ref as any,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Tooltip title="Container" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <SquareIcon />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(
              ref as any,
              <Text fontSize="12" textAlign="left" text="Hi there" />
            )
          }
        >
          <Tooltip title="Text" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <TypeIcon />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref as any, <Button />)}>
          <Tooltip title="Button" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <ButtonIcon />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref as any, <Video />)}>
          <Tooltip title="Video" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <YoutubeIcon />
            </Item>
          </Tooltip>
        </div>
      </div>
    </ToolboxDiv>
  );
};
