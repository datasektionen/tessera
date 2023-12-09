import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PALLETTE from "../../theme/pallette";

interface StatusIconProps {
  isValid: boolean;
}

const StatusIcon: React.FC<StatusIconProps> = ({ isValid }) => {
  const checkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [1, 1.5, 1], // pop effect
      rotate: [0, -10, 10, -10, 10, 0], // wiggle effect
      opacity: 1,
      transition: {
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 15,
          when: "beforeChildren",
          duration: 0.5,
        },
        rotate: {
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.3, // delay rotate to start after scale
        },
      },
    },
    exit: { scale: 0, opacity: 0 },
  };

  const editVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  };

  const iconStyle = {
    color: isValid ? PALLETTE.green : PALLETTE.yellow,
    fontSize: "32px", // Makes the icon slightly bigger
    padding: "10px", // Adds padding around the icon
    borderRadius: "50%", // Makes the background round
    backgroundColor: PALLETTE.charcoal,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Optional: Adds a subtle shadow
  };

  return (
    <div
      style={{
        position: "absolute",
        right: "5%",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <AnimatePresence mode="wait" onExitComplete={() => {}}>
        {isValid ? (
          <motion.div
            key="check"
            initial="hidden"
            animate="visible" // animate key now references the variant with pop and wiggle
            exit="exit"
            variants={checkVariants}
          >
            <CheckCircleIcon style={iconStyle} />
          </motion.div>
        ) : (
          <motion.div
            key="edit"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={editVariants}
          >
            <EditIcon style={iconStyle} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusIcon;
