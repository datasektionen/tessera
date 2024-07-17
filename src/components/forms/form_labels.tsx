import { FormLabel } from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

export const StyledFormLabel: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  overrideStyles?: React.CSSProperties;
}> = ({ children, overrideStyles = {}, fontSize = 20 }) => {
  return (
    <FormLabel style={overrideStyles ? overrideStyles : {}}>
      <StyledText
        level="body-md"
        fontSize={fontSize}
        color={PALLETTE.charcoal}
        fontWeight={700}
      >
        {children}
      </StyledText>
    </FormLabel>
  );
};

export const StyledFormLabelWithHelperText: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <FormLabel>
      <StyledText
        level="body-md"
        fontSize={16}
        color={PALLETTE.charcoal}
        style={{
          marginTop: 5,
          overflowWrap: "break-word",
          width: "100%",
        }}
      >
        {children}
      </StyledText>
    </FormLabel>
  );
};
