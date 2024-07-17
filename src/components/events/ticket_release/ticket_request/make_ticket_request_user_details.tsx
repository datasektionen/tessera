import { Form, Formik } from "formik";
import {
  ICustomerLoginValues,
  ICustomerSignupValues,
  IGuestCustomer,
  IGuestCustomerForm,
  ITicketRelease,
} from "../../../../types";
import * as Yup from "yup";
import { Box, Divider, FormControl, Link, Stack } from "@mui/joy";
import { FormCheckbox, FormInput } from "../../../forms/input_types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import { StyledErrorMessage } from "../../../forms/messages";
import StyledButton from "../../../buttons/styled_button";
import PALLETTE from "../../../../theme/pallette";
import StyledText from "../../../text/styled_text";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../store";
import { useDispatch } from "react-redux";
import {
  customerLoginRequest,
  customerSignupRequest,
} from "../../../../redux/features/authSlice";
import { useSelector } from "react-redux";
import {
  hasLottery,
  ticketReleaseRequiresAccount,
} from "../../../../utils/manage_event/can_edit_payment_deadline";
import { useTranslation } from "react-i18next";
import CustomerLoginForm from "../../../customer/login_form";
import { createSignupValidationSchema } from "../../../../validation/user/customer_signup_validation";
import CustomerSignupForm from "../../../customer/signup_form";

interface MakeTicketRequestUserDetailsProps {
  accountIsRequired: boolean;
  ticketRelease: ITicketRelease;
  onSignupContinue: (values: ICustomerSignupValues) => void;
  onLoginContinue: () => void;
}

const MakeTicketRequestUserDetails: React.FC<
  MakeTicketRequestUserDetailsProps
> = ({
  accountIsRequired,
  ticketRelease,
  onLoginContinue,
  onSignupContinue,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const [hasAccount, setHasAccount] = useState<boolean>(false);

    const initialValues = {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      is_saved: accountIsRequired,
      password: "",
      password_repeat: "",
    };

    const onSignup = (values: ICustomerSignupValues) => {
      dispatch(customerSignupRequest(values));

      if (values.is_saved) {
        setHasAccount(true);
      }
    };

    const onLogin = (values: ICustomerLoginValues) => {
      dispatch(customerLoginRequest(values));
    };

    // "event.ticket_release.request_process"
    const { t } = useTranslation();

    const validatationSchema = createSignupValidationSchema(accountIsRequired);

    return (
      <Box>
        {/* Already has an account */}
        {accountIsRequired && (
          <StyledText
            level="body"
            color={PALLETTE.charcoal}
            fontWeight={700}
            fontSize={18}
            sx={{
              my: 1,
            }}
          >
            {t(
              "event.ticket_release.request_process.account_required_description"
            )}
          </StyledText>
        )}
        {!hasAccount && (
          <Box>
            <StyledText level="h4" color={PALLETTE.cerise_dark}>
              {t("event.ticket_release.request_process.already_have_an_account")}
            </StyledText>
            <StyledButton
              onClick={() => setHasAccount(true)}
              size="md"
              bgColor={PALLETTE.cerise}
              color={PALLETTE.offBlack}
              sx={{
                mt: 1,
              }}
            >
              {t("form.button_sign_in")}
            </StyledButton>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {hasAccount ? (
          <>
            <CustomerLoginForm onLogin={onLogin} />
            <StyledText
              level="body"
              color={PALLETTE.charcoal_see_through}
              fontSize={16}
              sx={{
                mt: 1,
              }}
            >
              <Link href="/forgot-password">Forgot your password?</Link>
            </StyledText>
            <StyledText
              level="body"
              color={PALLETTE.charcoal_see_through}
              fontSize={16}
              onClick={() => setHasAccount(false)}
              sx={{
                mt: 1,
              }}
            >
              <Link href="#">Continue as guest</Link>
            </StyledText>
          </>
        ) : (
          <CustomerSignupForm
            onSignup={onSignup}
            accountIsRequired={accountIsRequired}
          />
        )}
      </Box>
    );
  };

export default MakeTicketRequestUserDetails;
