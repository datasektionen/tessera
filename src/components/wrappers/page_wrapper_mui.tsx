import React, { useState, useEffect } from "react";
import NavigationBar from "../navigation";
import { Box, IconButton } from "@mui/joy";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { } from "@mui/x-data-grid/themeAugmentation";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Footer from "./footer";
import PALLETTE from "../../theme/pallette";
import { motion } from "framer-motion";

interface TesseraWrapperProps {
  children: React.ReactNode;
}

export const SHOW_SCROLL_UP_THRESHOLD = 800;

const MUITesseraWrapper: React.FC<TesseraWrapperProps> = ({ children }) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > SHOW_SCROLL_UP_THRESHOLD) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= SHOW_SCROLL_UP_THRESHOLD) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

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
      <NavigationBar />

      <Box
        sx={{ minHeight: "100vh" }}
        id="tessera-wrapper"
        style={{
          backgroundColor: PALLETTE.offWhite,
          overflow: "hidden",
          marginTop: "16px",
        }}
      >
        {children}
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showScroll ? 1 : 0, y: showScroll ? 0 : 50 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'fixed', top: '90px', right: '30px', zIndex: 1000 }}
      >
        <IconButton
          sx={{
            backgroundColor: PALLETTE.cerise,
            color: '#fff',
            '&:hover': {
              backgroundColor: PALLETTE.cerise,
            },
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
          onClick={scrollTop}
          aria-label="Scroll to top"
        >
          <ArrowUpwardIcon />
        </IconButton>
      </motion.div>

      <Footer />
    </>
  );
};

export default MUITesseraWrapper;
