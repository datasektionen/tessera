import { useEditor } from "@craftjs/core";
import { DefaultLayerHeader, Layers, EditableLayerName } from "@craftjs/layers";
import React, { useState } from "react";
import { Box } from "@mui/material";

import { SidebarItem } from "./SidebarItem";
import CustomizeIcon from "@mui/icons-material/Tune";
import LayerIcon from "@mui/icons-material/Layers";
import { Toolbar } from "../../Toolbar";

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <Box
      sx={{
        width: "400px",
        opacity: enabled ? 1 : 0,
        background: "#fff",
        marginRight: enabled ? 0 : -280,
        className: "sidebar transition bg-white w-2",
        overflow: "scroll",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <SidebarItem
          icon={<CustomizeIcon />}
          title="Customize"
          height={"fit-content"}
          visible={toolbarVisible}
          onChange={(val) => setToolbarVisible(val)}
        >
          <Toolbar />
        </SidebarItem>
        <SidebarItem
          icon={<LayerIcon />}
          title="Layers"
          height={"fit-content"}
          visible={layersVisible}
          onChange={(val) => setLayerVisible(val)}
        >
          <Box sx={{ display: "flex" }}>
            <Layers expandRootOnLoad={true} />
          </Box>
        </SidebarItem>
      </Box>
    </Box>
  );
};
