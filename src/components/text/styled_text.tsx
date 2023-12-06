import { Typography, TypographyTypeMap } from "@mui/joy";
import React from "react";

interface StyledTextProps {
  children: React.ReactNode;
  level: string;
  color: string;
  fontWeight?: number;
  fontSize?: number;
  style?: React.CSSProperties;
  startDecorator?: React.ReactNode;
}

const StyledText: React.FC<StyledTextProps> = ({
  children,
  level,
  color,
  style,
  fontSize = 18,
  startDecorator,
  fontWeight,
}) => {
  return (
    <Typography
      // @ts-ignore
      level={level}
      fontFamily={"Josefin Sans"}
      fontWeight={fontWeight}
      fontSize={fontSize}
      startDecorator={startDecorator}
      style={{
        ...style,
        color: color,
      }}
    >
      {children}
    </Typography>
  );
};

export default StyledText;
