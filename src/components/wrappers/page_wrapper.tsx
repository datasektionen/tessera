import React from "react";
import NavigationBar from "../navigation";
import { Box } from "@mui/joy";
import EventList from "../events/list";
import PALLETTE from "../../theme/pallette";

interface TesseraWrapperProps {
  children: React.ReactNode;
}

const TesseraWrapper: React.FC<TesseraWrapperProps> = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <Box
        sx={{ width: "100vw", height: "100vh" }}
        style={{
          backgroundColor: PALLETTE.offWhite,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default TesseraWrapper;
