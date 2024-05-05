import { Element, useEditor } from "@craftjs/core";
import { Tooltip, Box } from "@mui/material";
import React from "react";

import ButtonIcon from "@mui/icons-material/Apps";
import SquareIcon from "@mui/icons-material/AspectRatio";
import TypeIcon from "@mui/icons-material/TextFields";
import YoutubeIcon from "@mui/icons-material/VideoCall";

import { Button } from "../../selectors/Button";
import { Container } from "../../selectors/Container";
import { Text } from "../../selectors";
import { Video } from "../../selectors/Video";
import PALLETTE from "../../../../../../../theme/pallette";

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <Box
      sx={{
        transition: "0.4s cubic-bezier(0.19, 1, 0.22, 1)",
        width: enabled ? "3rem" : 0,
        opacity: enabled ? 1 : 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: PALLETTE.beige,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "1rem",
        }}
      >
        <Box
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
            <Box
              sx={{
                margin: "0.5rem",
                paddingBottom: "0.5rem",
                cursor: "pointer",
                display: "block",
              }}
            >
              <SquareIcon
                sx={{ width: "1.375rem", height: "1.375rem", fill: "#707070" }}
              />
            </Box>
          </Tooltip>
        </Box>
        <Box
          ref={(ref) =>
            create(
              ref as any,
              <Text fontSize="12" textAlign="left" text="Hi there" />
            )
          }
        >
          <Tooltip title="Text" placement="right">
            <Box
              sx={{
                margin: "0.5rem",
                paddingBottom: "0.5rem",
                cursor: "pointer",
                display: "block",
              }}
            >
              <TypeIcon
                sx={{ width: "1.375rem", height: "1.375rem", fill: "#707070" }}
              />
            </Box>
          </Tooltip>
        </Box>
        <Box ref={(ref) => create(ref as any, <Button />)}>
          <Tooltip title="Button" placement="right">
            <Box
              sx={{
                margin: "0.5rem",
                paddingBottom: "0.5rem",
                cursor: "pointer",
                display: "block",
              }}
            >
              <ButtonIcon
                sx={{ width: "1.375rem", height: "1.375rem", fill: "#707070" }}
              />
            </Box>
          </Tooltip>
        </Box>
        <Box ref={(ref) => create(ref as any, <Video />)}>
          <Tooltip title="Video" placement="right">
            <Box
              sx={{
                margin: "0.5rem",
                paddingBottom: "0.5rem",
                cursor: "pointer",
                display: "block",
              }}
            >
              <YoutubeIcon
                sx={{ width: "1.375rem", height: "1.375rem", fill: "#707070" }}
              />
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};
