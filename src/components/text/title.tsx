import { Typography } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import React from "react";

interface TitleProps {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({
  color = PALLETTE.cerise,
  fontSize = 48,
  fontWeight = 700,
  children,
}) => {
  return (
    <Typography
      level="h1"
      fontFamily={"Josefin sans"}
      fontSize={fontSize}
      fontWeight={fontWeight}
      style={{
        color: color,
        textOverflow: "ellipsis",
        overflow: "hidden",
      }}
    >
      {children}
    </Typography>
  );
};

export default Title;
