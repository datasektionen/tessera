import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import PALLETTE from "../../theme/pallette";
import {
  IEvent,
  IOrganization,
  IOrganizationUser,
  ITicketRequest,
  OrganizationUserRole,
} from "../../types";
import StyledText from "../text/styled_text";
import Title from "../text/title";
import BorderBox from "../wrappers/border_box";
import { useEffect, useState } from "react";
import {
  getOrganizationEventsRequest,
  getOrganizationUsersRequest,
} from "../../redux/features/organizationSlice";
import LoadingOverlay from "../Loading";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Input,
  Link,
  ListDivider,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import { getUserFullName } from "../../utils/user_utils";
import { removeUserSuccess } from "../../redux/sagas/organizationSaga";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import StyledButton from "../buttons/styled_button";
import ConfirmModal from "../modal/confirm_modal";
import { cancelTicketRequestRequest } from "../../redux/features/myTicketRequestsSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/def";

interface ViewTicketRequestProps {
  ticketRequest: ITicketRequest;
}

const ViewTicketRequest: React.FC<ViewTicketRequestProps> = ({
  ticketRequest,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const [confirmCancelOpen, setConfirmCancelOpen] = useState<boolean>(false);

  useEffect(() => {
    // This function now updates the screenWidth state immediately.
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth / 2.3;
      console.log(newWidth);
      setScreenWidth(newWidth);
    };

    // Call it immediately and also set it up as a resize event listener.
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    // Return a cleanup function to remove the event listener when the component unmounts.
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const { user: currentUser } = useSelector((state: RootState) => state.user);

  console.log(ticketRequest);

  const handleCancel = () => {
    dispatch(cancelTicketRequestRequest(ticketRequest));
    setConfirmCancelOpen(false);
  };

  if (!ticketRequest) {
    return <></>;
  }

  const iterationArray = Array.from(
    Array(ticketRequest.ticket_amount).keys()
  ).map((item) => item + 1);

  return (
    <BorderBox
      style={{ marginTop: "16px", width: screenWidth, position: "fixed" }}
    >
      <Title fontSize={32}>{ticketRequest.ticket_type?.name}</Title>
      <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
        Made at {new Date(ticketRequest.created_at).toLocaleString()}
      </StyledText>

      <Box mt={2}>
        <StyledText level="body-sm" fontSize={22} color={PALLETTE.charcoal}>
          Cost Overview
        </StyledText>
        <>
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid container justifyContent={"flex-start"} flexDirection={"row"}>
              <LocalActivityIcon />
              <StyledText
                level="body-sm"
                color={PALLETTE.charcoal}
                fontSize={18}
                style={{
                  marginLeft: "8px",
                }}
              >
                {ticketRequest.ticket_amount} x{" "}
                {ticketRequest.ticket_type?.name}
              </StyledText>
            </Grid>
            <StyledText level="body-sm" color={PALLETTE.charcoal} fontSize={18}>
              SEK{" "}
              {(
                ticketRequest.ticket_type?.price! * ticketRequest.ticket_amount
              ).toFixed(2)}
            </StyledText>
          </Grid>
          <Divider />
        </>
      </Box>
      <Box>
        <ConfirmModal
          isOpen={confirmCancelOpen}
          onClose={() => setConfirmCancelOpen(false)}
          title="Confirm cancellation"
          actions={[
            <StyledButton
              bgColor={PALLETTE.offWhite}
              size="md"
              onClick={() => {}}
              style={{
                width: "300px",
                marginTop: "16px",
              }}
            >
              Cancel TICKET
            </StyledButton>,
            <StyledButton
              bgColor={PALLETTE.green}
              size="md"
              onClick={() => setConfirmCancelOpen(false)}
              style={{
                width: "100%",
                marginTop: "16px",
              }}
            >
              Go Back
            </StyledButton>,
          ]}
        >
          <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
            Are you sure you want to cancel this ticket request? This action
            cannot be undone.
          </StyledText>
        </ConfirmModal>

        {!ticketRequest.is_handled ? (
          <StyledButton
            bgColor={PALLETTE.red}
            size="md"
            onClick={() => setConfirmCancelOpen(true)}
            style={{
              width: "250px",
              marginTop: "16px",
            }}
          >
            Cancel Request
          </StyledButton>
        ) : (
          <StyledButton
            bgColor={PALLETTE.green}
            size="md"
            onClick={() => {
              navigate(ROUTES.PROFILE_TICKETS);
            }}
            style={{
              width: "250px",
              marginTop: "16px",
            }}
          >
            Go to tickets
          </StyledButton>
        )}
      </Box>
    </BorderBox>
  );
};

export default ViewTicketRequest;
