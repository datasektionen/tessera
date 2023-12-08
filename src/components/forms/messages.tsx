import { ErrorMessage } from "formik";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

interface StyledErrorMessageProps {
  name: string;
}

export const StyledErrorMessage: React.FC<StyledErrorMessageProps> = ({
  name,
}) => {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => {
        return (
          <StyledText color={PALLETTE.red} fontSize={12} level="body-sm">
            {msg}
          </StyledText>
        );
      }}
    />
  );
};
