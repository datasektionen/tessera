import { Box, Step, Stepper } from "@mui/joy";
import { StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import MakeTicketRequestUserDetails from "./make_ticket_request_user_details";
import {
  ICustomerLoginValues,
  ICustomerSignupValues,
  IGuestCustomer,
  IGuestCustomerForm,
  ITicketRelease,
  ITicketRequest,
} from "../../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import {
  customerLoginRequest,
  customerSignupRequest,
  resetGuestCustomer,
  resetLoginSuccess,
  resetSignupSuccess,
} from "../../../../redux/features/authSlice";
import { useSelector } from "react-redux";
import MakeTicketRequestFormDetails from "./make_ticket_request_form_details";
import { ticketReleaseRequiresAccount } from "../../../../utils/manage_event/can_edit_payment_deadline";

interface MakeTicketRequestWorkflowProps {
  ticketRelease: ITicketRelease;
  onSubmitGuestTicketRequest: () => void; // Logic managed in parent component
  onSubmitTicketRequest: () => void; // Logic managed in parent component
}

const MakeTicketRequestWorkflow: React.FC<MakeTicketRequestWorkflowProps> = ({
  ticketRelease,
  onSubmitTicketRequest,
  onSubmitGuestTicketRequest,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [accountIsRequired, setAccountIsRequired] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const {
    customerSignupSuccess,
    customerLoginSuccess,
    isLoggedIn,
    guestCustomer,
    loading,
  } = useSelector((state: RootState) => state.auth);

  const { create_ticket_request_sucess } = useSelector(
    (state: RootState) => state.guestCustomer
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

  const onLoginContinue = () => {
    handleNext();
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
    dispatch(resetSignupSuccess());
    dispatch(resetLoginSuccess());
    dispatch(resetGuestCustomer());
  }, []);

  useEffect(() => {
    console.log(guestCustomer);
    if (guestCustomer !== null && !create_ticket_request_sucess && !loading) {
      onSubmitGuestTicketRequest();
      // handleNext();
    }
  }, [guestCustomer]);

  useEffect(() => {
    if (create_ticket_request_sucess) {
      handleNext();
    }
  }, [create_ticket_request_sucess]);

  useEffect(() => {
    if (customerSignupSuccess) {
      dispatch(resetSignupSuccess());
    }
    if (customerLoginSuccess) {
      dispatch(resetLoginSuccess());

      // Ticket request should be made
      onSubmitTicketRequest();
    }
  }, [customerLoginSuccess, customerSignupSuccess, dispatch]);

  useEffect(() => {
    if (isLoggedIn && !loading) {
      handleNext();

      // Ticket request should be made
      onSubmitTicketRequest();
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
