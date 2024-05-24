import React from "react";
import { Box } from "@mui/material";
import usePinnedDrawer from "../../hooks/drawer_pinned_hook";
import DrawerComponent from "../navigation/manage_drawer/event_detail";
import TesseraWrapper from "./page_wrapper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ManagerDashboardDrawerComponent from "../navigation/manage_drawer/manager_dashboard";

interface DrawerBoxWrapperProps {
  eventID?: string;
  children?: React.ReactNode;
  showManagerDashboard?: boolean;
}

const DrawerBoxWrapper: React.FC<DrawerBoxWrapperProps> = ({
  eventID,
  children,
  showManagerDashboard = false,
}) => {
  const { marginLeft, isPinned, handlePinned } = usePinnedDrawer("75px");

  return showManagerDashboard ? (
    <>
      <ManagerDashboardDrawerComponent handlePinned={handlePinned} />
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
  ) : (
    <>
      <DrawerComponent eventID={eventID!} handlePinned={handlePinned} />
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
