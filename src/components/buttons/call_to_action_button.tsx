import { ButtonProps } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import PALLETTE from "../../theme/pallette";
import { useTranslation } from "react-i18next";
import StyledButton from "./styled_button";

interface CallToActionButtonProps extends ButtonProps {}

const CallToActionButton: React.FC<CallToActionButtonProps> = ({
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      style={{
        position: "relative",
      }}
    >
      <StyledButton
        bgColor={PALLETTE.cerise}
        // @ts-ignore
        size="lg"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
        }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
        {...props}
      >
        {t("main_page.learn_how_button")}
      </StyledButton>
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "0%",
          translateY: "-50%",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: PALLETTE.offWhite,
          mixBlendMode: "multiply",
          zIndex: 2,
        }}
        initial={{ x: "-200%", y: "-50%" }}
        animate={{ x: "1500%", y: ["-50%", "50%", "-50%"] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default CallToActionButton;
