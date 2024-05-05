import { useEditor } from "@craftjs/core";
import React from "react";
import { Box, Typography } from "@mui/material";

export * from "./ToolbarItem";
export * from "./ToolbarSection";
export * from "./ToolbarTextInput";
export * from "./ToolbarDropdown";

export const Toolbar = () => {
  const { active, related } = useEditor((state, query) => {
    // TODO: handle multiple selected elements
    const currentlySelectedNodeId = query.getEvent("selected").first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <Box sx={{ py: 1, height: "100%" }}>
      {active && related.toolbar && React.createElement(related.toolbar)}
      {!active && (
        <Box
          sx={{
            px: 5,
            py: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.5607843137254902)",
            fontSize: "11px",
          }}
        >
          <Typography variant="h6" sx={{ pb: 1 }}>
            Click on a component to start editing.
          </Typography>
          <Typography variant="h6">
            You could also double click on the layers below to edit their names,
            like in Photoshop
          </Typography>
        </Box>
      )}
    </Box>
  );
};
