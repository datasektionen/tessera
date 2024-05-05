import { useEditor } from "@craftjs/core";
import { Tooltip, Box, Typography } from "@mui/material";
import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";

export const Header = () => {
  const { enabled, canUndo, canRedo, actions } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  console.log(enabled);

  return (
    <Box
      sx={{
        width: "100%",
        height: "45px",
        zIndex: 99999,
        position: "relative",
        padding: "0px 10px",
        background: "#d4d4d4",
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "0 1rem",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {enabled && (
          <Box sx={{ flex: 1, display: "flex" }}>
            <Tooltip title="Undo" placement="bottom">
              <Box
                sx={{
                  marginRight: "10px",
                  cursor: canUndo ? "pointer" : "not-allowed",
                  opacity: canUndo ? 1 : 0.5,
                }}
                onClick={() => canUndo && actions.history.undo()}
              >
                <UndoIcon
                  sx={{ width: "20px", height: "20px", fill: "#707070" }}
                />
              </Box>
            </Tooltip>
            <Tooltip title="Redo" placement="bottom">
              <Box
                sx={{
                  marginRight: "10px",
                  cursor: canRedo ? "pointer" : "not-allowed",
                  opacity: canRedo ? 1 : 0.5,
                }}
                onClick={() => canRedo && actions.history.redo()}
              >
                <RedoIcon
                  sx={{ width: "20px", height: "20px", fill: "#707070" }}
                />
              </Box>
            </Tooltip>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "5px 15px",
            borderRadius: "3px",
            color: "#fff",
            fontSize: "13px",
            backgroundColor: enabled ? "green" : "primary.main",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={() => {
            actions.setOptions((options) => (options.enabled = !enabled));
          }}
        >
          {enabled ? (
            <CheckIcon
              sx={{
                marginRight: "6px",
                width: "12px",
                height: "12px",
                fill: "#fff",
                opacity: 0.9,
              }}
            />
          ) : (
            <EditIcon
              sx={{
                marginRight: "6px",
                width: "12px",
                height: "12px",
                fill: "#fff",
                opacity: 0.9,
              }}
            />
          )}
          <Typography variant="body2">
            {enabled ? "Finish Editing" : "Edit"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
