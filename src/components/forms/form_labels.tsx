import { FormLabel } from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

export const StyledFormLabel: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <FormLabel>
      <StyledText
        level="body-md"
        fontSize={20}
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
        }}
      >
        {children}
      </StyledText>
    </FormLabel>
  );
};
