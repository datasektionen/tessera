import React from "react";
import { Box } from "@mui/material";
import usePinnedDrawer from "../../hooks/drawer_pinned_hook";
import DrawerComponent from "../navigation/manage_drawer";
import TesseraWrapper from "./page_wrapper";

interface DrawerBoxWrapperProps {
  eventID: string;

  children: React.ReactNode;
}

const DrawerBoxWrapper: React.FC<DrawerBoxWrapperProps> = ({
  eventID,
  children,
}) => {
  const drawerWidth = 240; // replace with your drawer width
  const { marginLeft, isPinned, handlePinned } = usePinnedDrawer("70px");

  console.log("DrawerBoxWrapper", marginLeft);

  return (
    <>
      <DrawerComponent
        eventID={eventID}
        handlePinned={handlePinned}
        initialIsPinned={isPinned}
      />
      <Box
        component={"main"}
        sx={{
          ml: marginLeft,
          mr: 1.5,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default DrawerBoxWrapper;
