import { Box, Link, Step, Stepper } from "@mui/joy";
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
import EditFormFieldResponse from "../../form_field_response/edit";
import StyledText from "../../../text/styled_text";
import { Trans } from "react-i18next";
import PALLETTE from "../../../../theme/pallette";
import { act } from "react-dom/test-utils";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetGustCustomer,
  resetRequestSuccess,
} from "../../../../redux/features/guestCustomerSlice";

interface MakeTicketRequestWorkflowProps {
  ticketRelease: ITicketRelease;
  onSubmitGuestTicketRequest: () => void; // Logic managed in parent component
  onSubmitTicketRequest: () => void; // Logic managed in parent component
  onClose: () => void;
}

const MakeTicketRequestWorkflow: React.FC<MakeTicketRequestWorkflowProps> = ({
  ticketRelease,
  onSubmitTicketRequest,
  onSubmitGuestTicketRequest,
  onClose,
}) => {
  const { refID } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [accountIsRequired, setAccountIsRequired] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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

  const { ticketRequests: madeTicketRequests } = useSelector(
    (state: RootState) => state.myTicketRequests
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
    if (guestCustomer !== null && !create_ticket_request_sucess && !loading) {
      onSubmitGuestTicketRequest();
      // handleNext();
    }
  }, [guestCustomer]);

  useEffect(() => {
    if (create_ticket_request_sucess) {
      dispatch(resetRequestSuccess());
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

  useEffect(() => {
    const isGuestCustomer = guestCustomer !== null;
    if (activeStep === 1 && !isGuestCustomer) {
      handleNext();
    }

    if (activeStep === 2 && isGuestCustomer) {
      setTimeout(() => {
        navigate(
          `/events/${refID!}/guest/${guestCustomer.ug_kth_id}?request_token=${
            guestCustomer.request_token
          }`
        );
      }, 1000);
    }

    if (
      activeStep === 2 &&
      madeTicketRequests[0] &&
      !(madeTicketRequests[0].ticket_release!.event!.form_fields!.length > 0)
    ) {
      onClose();
      // Do nothing when the check passes
    }
  }, [guestCustomer, activeStep, madeTicketRequests, navigate, refID, onClose]);

  // Initially reset
  useEffect(() => {
    dispatch(resetGustCustomer());
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

        {activeStep === 2 &&
          madeTicketRequests[0] &&
          madeTicketRequests[0].ticket_release!.event!.form_fields!.length >
            0 && (
            <Box>
              <EditFormFieldResponse ticketRequest={madeTicketRequests[0]} />
              <StyledText
                color={PALLETTE.charcoal}
                level="body-sm"
                fontSize={18}
                fontWeight={500}
                style={{
                  marginTop: "1rem",
                }}
              >
                <Trans i18nKey="event.ticket_request_success_description">
                  hjdw
                  <Link href="/profile/ticket-requests" target="_blank">
                    here{" "}
                  </Link>
                </Trans>
              </StyledText>
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default MakeTicketRequestWorkflow;
