import { Box, Step, Stepper } from "@mui/joy";
import { StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import MakeTicketRequestUserDetails from "./make_ticket_request_user_details";
import {
  ICustomerLoginValues,
  ICustomerSignupValues,
  ITicketRelease,
  ITicketRequest,
} from "../../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import {
  customerLoginRequest,
  customerSignupRequest,
  resetSignupSuccess,
} from "../../../../redux/features/authSlice";
import { useSelector } from "react-redux";
import MakeTicketRequestFormDetails from "./make_ticket_request_form_details";
import { ticketReleaseRequiresAccount } from "../../../../utils/manage_event/can_edit_payment_deadline";

interface MakeTicketRequestWorkflowProps {
  ticketRelease: ITicketRelease;
}

const MakeTicketRequestWorkflow: React.FC<MakeTicketRequestWorkflowProps> = ({
  ticketRelease,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [accountIsRequired, setAccountIsRequired] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const { customerSignupSucess, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSignupContinue = (values: ICustomerSignupValues) => {
    dispatch(customerSignupRequest(values));
  };

  const onLoginContinue = (values: ICustomerLoginValues) => {
    dispatch(customerLoginRequest(values));
  };

  useEffect(() => {
    const requiresAccount = ticketReleaseRequiresAccount(
      ticketRelease.ticketReleaseMethodDetail.ticketReleaseMethod!
    );

    if (requiresAccount) {
      setAccountIsRequired(true);
    }
  }, [ticketRelease]);

  useEffect(() => {
    if (customerSignupSucess) {
      handleNext();
      dispatch(resetSignupSuccess());
    }
  }, [customerSignupSucess, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      handleNext();
    }
  }, []);

  return (
    <Box>
      <Stepper>
        <Step completed={activeStep > 0}>Customer Details</Step>
        <Step completed={activeStep > 1}>Request Items</Step>
        <Step completed={activeStep > 2}>Review</Step>
      </Stepper>
      <Box>
        {activeStep === 0 && (
          <MakeTicketRequestUserDetails
            accountIsRequired={accountIsRequired}
            ticketRelease={ticketRelease}
            onSignupContinue={onSignupContinue}
            onLoginContinue={onLoginContinue}
          />
        )}
        {activeStep === 1 && (
          <MakeTicketRequestFormDetails
            ticketRelease={ticketRelease}
            onContinue={handleNext}
          />
        )}
        {activeStep === 2 && <div></div>}
      </Box>
    </Box>
  );
};

export default MakeTicketRequestWorkflow;
