import React from "react";
import NavigationBar from "../navigation";
import { Box } from "@mui/joy";
import EventList from "../events/list";
import PALLETTE from "../../theme/pallette";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface TesseraWrapperProps {
  children: React.ReactNode;
}

const TesseraWrapper: React.FC<TesseraWrapperProps> = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <NavigationBar />
      <Box
        sx={{ width: "100vw", minHeight: "100vh" }}
        id="tessera-wrapper"
        style={{
          backgroundColor: PALLETTE.offWhite,
          overflowX: "hidden",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default TesseraWrapper;
