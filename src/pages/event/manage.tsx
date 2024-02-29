import { Box, Grid, IconButton, Input, Stack, Tooltip } from "@mui/joy";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import Title from "../../components/text/title";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventRequest } from "../../redux/features/eventSlice";
import LoadingOverlay from "../../components/Loading";
import EventDetailInfo from "../../components/events/detail_info";
import StyledText from "../../components/text/styled_text";
import StyledButton from "../../components/buttons/styled_button";
import PALLETTE from "../../theme/pallette";
import { fetchEventTicketsStart } from "../../redux/features/eventTicketsSlice";
import TicketsList from "../../components/tickets/list_tickets";
import EventTicketsList from "../../components/events/tickets/list";
import MUITesseraWrapper from "../../components/wrappers/page_wrapper_mui";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ListEventTicketReleases from "../../components/events/ticket_release/list";
import { useTranslation } from "react-i18next";
import ConfirmModal from "../../components/modal/confirm_modal";
import { deleteEventStart } from "../../redux/features/editEventSlice";
import axios from "axios";
import { useCanAccessEvent } from "../../utils/event_access";
import { DefaultInputStyle } from "../../components/forms/input_types";
import { GetSecretToken } from "../../redux/sagas/axios_calls/secret_token";
import TicketEventFormResponseTable from "../../components/events/tickets/ticket_form_response/table";

const ManageEventPage: React.FC = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();

  const { event, loading, error } = useSelector(
    (state: RootState) => state.eventDetail
  );
  const [canAccess, setCanAccess] = useState<boolean | null>(null);
  const [secretToken, setSecretToken] = useState<string>("");

  const canAccessEvent = useCanAccessEvent(eventID!);

  useEffect(() => {
    const fetchCanAccess = () => {
      if (canAccessEvent) {
        fetchSecretToken();
      }
    };

    const fetchSecretToken = async () => {
      const token = await GetSecretToken(parseInt(eventID!));
      setSecretToken(token);
    };

    fetchCanAccess();
  }, [canAccessEvent]); // Make sure to include all dependencies here

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState<string>("");
  const [confirmDeleteTextIsValid, setConfirmDeleteTextIsValid] =
    useState<boolean>(false);

  const { tickets } = useSelector((state: RootState) => state.eventTickets);

  const dispatch: AppDispatch = useDispatch();

  const { t } = useTranslation();

  const handleEventDelete = () => {
    dispatch(deleteEventStart(parseInt(eventID!)));
    navigate("/events");
  };

  useEffect(() => {
    if (eventID) {
      dispatch(
        getEventRequest({
          id: parseInt(eventID),
          secretToken: "",
        })
      );
      dispatch(fetchEventTicketsStart(parseInt(eventID)));
    }
  }, [dispatch, eventID]);

  if (error) {
    navigate("/events");
  }

  if (!event) {
    return <LoadingOverlay />;
  }

  if (canAccess !== null && canAccess === false) {
    navigate("/events/" + eventID);
  }

  return (
    <MUITesseraWrapper>
      <Box mx="64px" mt={"16px"}>
        <Title
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "90%",
          }}
        >
          {t("manage_event.title")}
        </Title>
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setConfirmDeleteText("");
            setShowDeleteModal(false);
          }}
          title={t("manage_event.delete_event_title")}
          actions={[
            <StyledButton
              size="lg"
              key="confirm-delete"
              onClick={() => {
                setShowDeleteModal(false);
                handleEventDelete();
              }}
              bgColor={PALLETTE.offWhite}
              disabled={!confirmDeleteTextIsValid}
              color={PALLETTE.charcoal}
            >
              {t("form.button_confirm")}
            </StyledButton>,
            <StyledButton
              size="lg"
              key="cancel-delete"
              onClick={() => {
                // Close the modal
                setConfirmDeleteText("");
                setShowDeleteModal(false);
              }}
              bgColor={PALLETTE.orange}
              color={PALLETTE.charcoal}
            >
              {t("form.button_cancel")}
            </StyledButton>,
          ]}
        >
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            {t("manage_event.delete_event_confirmation")}
          </StyledText>

          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            {t("manage_event.delete_event_confirmation_enter_text")}
          </StyledText>
          <Input
            type="text"
            placeholder={"Type here"}
            value={confirmDeleteText}
            onChange={(e) => {
              setConfirmDeleteText(e.target.value);
              setConfirmDeleteTextIsValid(e.target.value === "delete");
            }}
            style={DefaultInputStyle}
          />
        </ConfirmModal>
        <Stack spacing={2} direction={"row"}>
          <StyledButton
            size="md"
            bgColor={PALLETTE.offWhite}
            onClick={() => {
              navigate(`/events/${event.id}/edit`);
            }}
            style={{ width: "150px" }}
          >
            {t("form.button_edit")}
          </StyledButton>

          <StyledButton
            size="md"
            bgColor={PALLETTE.orange}
            onClick={() => {
              setShowDeleteModal(true);
            }}
            style={{ width: "150px" }}
          >
            {t("form.button_delete")}
          </StyledButton>
          <StyledButton
            size="md"
            bgColor={PALLETTE.green}
            onClick={() => {
              navigate(`/events/${event.id}/manage/scan`);
            }}
            style={{ width: "150px" }}
          >
            {t("form.button_check_in")}
          </StyledButton>
          <StyledButton
            size="md"
            bgColor={PALLETTE.offWhite}
            onClick={() => {
              navigate(`/events/${event.id}/send-out`);
            }}
          >
            {t("form.button_send_out")}
          </StyledButton>
          <StyledButton
            size="md"
            bgColor={PALLETTE.yellow}
            onClick={() => {
              navigate(`/events/${event.id}/economy`);
            }}
            style={{ width: "150px" }}
          >
            {t("form.button_economy")}
          </StyledButton>
        </Stack>
        <EventDetailInfo event={event} secret_token={secretToken || ""} />

        <Grid container alignItems="center" justifyContent="flex-start" mt={2}>
          <Title fontSize={22} color={PALLETTE.charcoal}>
            {t("manage_event.manage_ticket_releases")}
          </Title>
          <Tooltip title={t("tooltips.manage_ticket_releases")}>
            <HelpOutlineIcon fontSize="inherit" sx={{ marginLeft: 2 }} />
          </Tooltip>
        </Grid>

        <ListEventTicketReleases
          ticketReleases={event.ticketReleases!}
          tickets={tickets}
        />

        <Grid container alignItems="center" justifyContent="flex-start" mt={2}>
          <Title fontSize={22} color={PALLETTE.charcoal}>
            {t("manage_event.manage_tickets")}
          </Title>
          <Tooltip title={t("tooltips.manage_tickets")}>
            <HelpOutlineIcon fontSize="inherit" sx={{ marginLeft: 2 }} />
          </Tooltip>
        </Grid>
        <EventTicketsList tickets={tickets} />

        <Grid container alignItems="center" justifyContent="flex-start" mt={2}>
          <Title fontSize={22} color={PALLETTE.charcoal}>
            {t("manage_event.manage_tickets_custom_event_form")}
          </Title>
          <Tooltip
            title={t("tooltips.manage_tickets_custom_event_form_description")}
          >
            <HelpOutlineIcon fontSize="inherit" sx={{ marginLeft: 2 }} />
          </Tooltip>
        </Grid>
        <TicketEventFormResponseTable tickets={tickets} />
      </Box>
    </MUITesseraWrapper>
  );
};

export default ManageEventPage;
