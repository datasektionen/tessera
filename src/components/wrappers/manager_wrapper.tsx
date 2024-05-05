import React from "react";
import { Box } from "@mui/material";
import usePinnedDrawer from "../../hooks/drawer_pinned_hook";
import DrawerComponent from "../navigation/manage_drawer";
import TesseraWrapper from "./page_wrapper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface DrawerBoxWrapperProps {
  eventID: string;

  children: React.ReactNode;
}

const DrawerBoxWrapper: React.FC<DrawerBoxWrapperProps> = ({
  eventID,
  children,
}) => {
  const { marginLeft, isPinned, handlePinned } = usePinnedDrawer("75px");

  return (
    <>
      <DrawerComponent eventID={eventID} handlePinned={handlePinned} />
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
