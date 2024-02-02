import { ErrorMessage } from "formik";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

interface StyledErrorMessageProps {
  name: string;
  fontSize?: number;
}

export const StyledErrorMessage: React.FC<StyledErrorMessageProps> = ({
  name,
  fontSize = 18,
}) => {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => {
        return (
          <StyledText color={PALLETTE.red} fontSize={fontSize} level="body-sm">
            {msg}
          </StyledText>
        );
      }}
    />
  );
};
