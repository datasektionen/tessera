import React from "react";
import { toast } from "react-toastify";
import StyledText from "../text/styled_text";
import StyledButton from "../buttons/styled_button";
import PALLETTE from "../../theme/pallette";
import { resendVerificationEmail } from "../../redux/sagas/axios_calls/resend_signup_verification_link";

const ResendVerificationLinkToast: React.FC<{
  email: string;
}> = ({ email }) => {
  const handleResendVerificationLink = () => {
    toast.dismiss();
    resendVerificationEmail(email)
      .then((response) => {
        toast.success(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div>
      <StyledText level="body-lg" fontSize={18} color={PALLETTE.charcoal}>
        It seems like you haven't verified your account yet.
      </StyledText>
      <StyledButton size="sm" onClick={handleResendVerificationLink}>
        Resend
      </StyledButton>
    </div>
  );
};

export default ResendVerificationLinkToast;
