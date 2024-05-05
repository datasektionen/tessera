import { useEditor } from "@craftjs/core";
import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Toolbox } from "./Toolbox";
import StyledButton from "../../../../../../../components/buttons/styled_button";
import { Button } from "@mui/material";

export const Viewport: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const {
    enabled,
    connectors,
    actions: { setOptions },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      // Notify doc site
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        "*"
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  const { query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const save = () => {
    const json = query.serialize();
    console.log(json);
    // Here you can send `json` to your server and save it in your database
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        overflow: "hidden",
        position: "fixed",
        width: "100%",
      }}
    >
      <Button onClick={save} variant="contained" sx={{ zIndex: 9999 }}>
        Save
      </Button>
      <Toolbox />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Header />
        <Box
          sx={{
            display: "flex",
            flex: 1,
            height: "100%",
            width: "100%",
            overflow: "auto",
            transition: "all 0.3s",
            backgroundColor: enabled ? "grey.200" : "white",
            padding: "0 0 8px 0",
          }}
          ref={(ref: HTMLElement | null) =>
            connectors.select(connectors.hover(ref as any, ""), "")
          }
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              paddingTop: "8px",
              width: "100%",
              mt: 4,
            }}
            className="page-container"
          >
            {children}
          </Box>
        </Box>
      </Box>
      <Sidebar />
    </Box>
  );
};
