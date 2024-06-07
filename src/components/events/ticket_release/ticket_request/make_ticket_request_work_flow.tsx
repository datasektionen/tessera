import { Box, CircularProgress, Link, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import MakeTicketRequestUserDetails from "./make_ticket_request_user_details";
import { ICustomerSignupValues, ITicketRelease } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import {
  customerSignupRequest,
  resetGuestCustomer,
  resetLoginSuccess,
  resetSignupSuccess,
} from "../../../../redux/features/authSlice";
import MakeTicketRequestFormDetails from "./make_ticket_order_form_details";
import { ticketReleaseRequiresAccount } from "../../../../utils/manage_event/can_edit_payment_deadline";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { useNavigate, useParams } from "react-router-dom";
import {
  getGuestCustomerRequest,
  resetGustCustomer,
  resetRequestSuccess,
} from "../../../../redux/features/guestCustomerSlice";
import {
  resetError,
  resetPostSuccess,
} from "../../../../redux/features/ticketOrderSlice";
import EditFormFieldResponse from "../../form_field_response/edit";
import { Trans } from "react-i18next";
import StyledButton from "../../../buttons/styled_button";

interface MakeTicketOrderWorkflowProps {
  ticketRelease: ITicketRelease;
  onSubmitGuestTicketOrder: () => void; // Logic managed in parent component
  onSubmitTicketOrder: () => void; // Logic managed in parent component
  onClose: () => void;
}

const MakeTicketOrderWorkflow: React.FC<MakeTicketOrderWorkflowProps> = ({
  ticketRelease,
  onSubmitTicketOrder,
  onSubmitGuestTicketOrder,
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

  const { postSuccess, error: postError } = useSelector(
    (state: RootState) => state.ticketOrder
  );

  console.log(postSuccess);

  const { create_ticket_request_sucess } = useSelector(
    (state: RootState) => state.guestCustomer
  );

  const { ticketOrders: madeTicketOrders } = useSelector(
    (state: RootState) => state.myTicketOrders
  );

  const { guestCustomer: fetchedGuestCustomer } = useSelector(
    (state: RootState) => state.guestCustomer
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const setStep = (step: number) => {
    setActiveStep(step);
  };

  const onSignupContinue = (values: ICustomerSignupValues) => {
    dispatch(customerSignupRequest(values));
  };

  const onLoginContinue = () => {
    handleNext();
  };

  const handleClose = () => {
    dispatch(resetSignupSuccess());
    dispatch(resetLoginSuccess());
    onClose();
  };

  // Check if account is required
  useEffect(() => {
    let requiresAccount = ticketReleaseRequiresAccount(
      ticketRelease.ticket_release_method_detail.ticket_release_method!
    );

    if (requiresAccount) {
      setAccountIsRequired(true);
    }
  }, [ticketRelease]);

  // Reset states on component mount
  useEffect(() => {
    dispatch(resetSignupSuccess());
    dispatch(resetLoginSuccess());
    dispatch(resetGuestCustomer());
  }, []);

  // Handle guest customer ticket request
  useEffect(() => {
    if (guestCustomer !== null && !create_ticket_request_sucess && !loading) {
      onSubmitGuestTicketOrder();
    }
  }, [guestCustomer]);

  // Handle ticket request success
  useEffect(() => {
    if (create_ticket_request_sucess) {
      dispatch(resetRequestSuccess());
      handleNext();
    }
  }, [create_ticket_request_sucess]);

  useEffect(() => {
    if (postSuccess) {
      handleNext();
      dispatch(resetPostSuccess());
    }
  }, [postSuccess]);

  useEffect(() => {
    if (isLoggedIn && !loading) {
      onSubmitTicketOrder();
    }
  }, []);

  useEffect(() => {
    if (postError) {
      dispatch(resetError());
      dispatch(resetPostSuccess());
      handleClose();
    }
  }, [postError]);

  // Handle customer signup and login success
  useEffect(() => {
    if (customerSignupSuccess) {
      dispatch(resetSignupSuccess());
    }
    if (customerLoginSuccess) {
      dispatch(resetLoginSuccess());
      onSubmitTicketOrder();
    }
  }, [customerLoginSuccess, customerSignupSuccess, dispatch]);

  // Handle navigation and state reset based on active step
  useEffect(() => {
    const isGuestCustomer = guestCustomer !== null;

    if (activeStep === 1 && !ticketRelease.event?.collect_food_preferences) {
      setTimeout(() => {
        handleNext();
      }, 200);
      return;
    }

    if (activeStep === 2 && isGuestCustomer) {
      setTimeout(() => {
        handleNext();
      }, 1000);
      dispatch(
        getGuestCustomerRequest({
          ugkthid: guestCustomer?.user_id!,
          request_token: guestCustomer?.request_token!,
        })
      );
      dispatch(resetSignupSuccess());
      dispatch(resetLoginSuccess());
      return;
    }

    if (activeStep === 2 && !isGuestCustomer) {
      setTimeout(() => {
        handleNext();
      }, 1000);
      dispatch(resetSignupSuccess());
      dispatch(resetLoginSuccess());
      dispatch(resetGuestCustomer());
      return;
    }

    if (activeStep === 4 && isGuestCustomer) {
      setTimeout(() => {
        navigate(
          `/events/${refID!}/guest/${guestCustomer.user_id}?request_token=${
            guestCustomer.request_token
          }`
        );
      }, 1000);
    } else if (activeStep === 4 && !isGuestCustomer) {
      setTimeout(() => {
        navigate(
          `/profile/ticket-orders?ticket_request_id=${madeTicketOrders[0].id}&created=true`
        );
      }, 1000);
    }

    if (
      activeStep === 3 &&
      madeTicketOrders[0] &&
      !isGuestCustomer &&
      !(madeTicketOrders[0].ticket_release!.event!.form_fields!.length > 0)
    ) {
      handleNext();
    } else if (
      activeStep === 3 &&
      fetchedGuestCustomer?.ticket_order &&
      isGuestCustomer &&
      !(
        fetchedGuestCustomer?.ticket_order.ticket_release!.event!.form_fields!
          .length > 0
      )
    ) {
      handleNext();
    }
  }, [guestCustomer, activeStep, madeTicketOrders, navigate, onClose]);

  // Reset guest customer on component mount
  useEffect(() => {
    dispatch(resetGustCustomer());
  }, []);

  return (
    <Box>
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

        {activeStep === 2 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              width: "100%",
            }}
          >
            <Stack
              spacing={2}
              direction={"column"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="success" size={"lg"} variant="plain" />

              <StyledText color={PALLETTE.primary} level="h2" fontSize={28}>
                Creating your ticket request...
              </StyledText>
            </Stack>
          </Box>
        )}
        {activeStep === 3 && (
          <Box>
            {guestCustomer?.ticket_order?.tickets.map((ticket) => (
              <EditFormFieldResponse
                ticket={ticket}
                isGuestCustomer={guestCustomer !== null}
              />
            ))}

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
                <Link href="/profile/ticket-orders" target="_blank">
                  here{" "}
                </Link>
              </Trans>
            </StyledText>
            <StyledButton
              size="lg"
              onClick={() => {
                handleNext();
              }}
              bgColor={PALLETTE.cerise}
              color={PALLETTE.offBlack}
              sx={{
                mt: 1,
              }}
            >
              View your ticket requests
            </StyledButton>
          </Box>
        )}
        {activeStep === 4 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              width: "100%",
            }}
          >
            <Stack
              spacing={2}
              direction={"column"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="success" size={"lg"} variant="plain" />

              <StyledText color={PALLETTE.primary} level="h2" fontSize={28}>
                Loading your ticket request...
              </StyledText>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MakeTicketOrderWorkflow;
