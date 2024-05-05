import { Box, Grid, IconButton, Input, Stack, Tooltip } from "@mui/joy";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import Title from "../../components/text/title";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingOverlay from "../../components/Loading";
import EventDetailInfo from "../../components/events/detail_info";
import StyledText from "../../components/text/styled_text";
import StyledButton from "../../components/buttons/styled_button";
import PALLETTE from "../../theme/pallette";

import MUITesseraWrapper from "../../components/wrappers/page_wrapper_mui";
import { useTranslation } from "react-i18next";
import ConfirmModal from "../../components/modal/confirm_modal";
import { deleteEventStart } from "../../redux/features/editEventSlice";
import { useCanAccessEvent } from "../../utils/event_access";
import { DefaultInputStyle } from "../../components/forms/input_types";
import { GetSecretToken } from "../../redux/sagas/axios_calls/secret_token";
import TicketEventFormResponseTable from "./manage/ticket_form_reponse_list_page";

import DrawerComponent from "../../components/navigation/manage_drawer";
import { useEventDetails } from "../../hooks/use_event_details_hook";
import usePinnedDrawer from "../../hooks/drawer_pinned_hook";
import DrawerBoxWrapper from "../../components/wrappers/manager_wrapper";

const ManageEventPage: React.FC = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();

  const [canAccess, setCanAccess] = useState<boolean | null>(null);
  const [secretToken, setSecretToken] = useState<string>("");

  const canAccessEvent = useCanAccessEvent(eventID!);

  useEffect(() => {
    const fetchCanAccess = () => {
      if (canAccessEvent) {
        fetchSecretToken();
      } else {
      }
    };

    const fetchSecretToken = async () => {
      const token = await GetSecretToken(parseInt(eventID!));
      setSecretToken(token);
    };

    fetchCanAccess();
  }, [canAccessEvent, eventID]); // Make sure to include all dependencies here

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState<string>("");
  const [confirmDeleteTextIsValid, setConfirmDeleteTextIsValid] =
    useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const { t } = useTranslation();

  const handleEventDelete = () => {
    dispatch(deleteEventStart(parseInt(eventID!)));
    navigate("/events");
  };

  const {
    eventDetail: { event, loading, error },
    eventTickets: { tickets },
  } = useEventDetails(parseInt(eventID!));

  const [isHovered, setIsHovered] = useState(false);

  const { marginLeft, isPinned, handlePinned } = usePinnedDrawer("70px");

  if (error) {
    navigate("/events");
  }

  if (!event || loading) {
    return <LoadingOverlay />;
  }

  if (canAccess !== null && canAccess === false) {
    navigate("/events/" + eventID);
  }

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper eventID={eventID!}>
        <Box mt={"16px"}>
          <Title
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "90%",
            }}
          >
            {t("manage_event.title", { event_name: event.name })}
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

          <EventDetailInfo
            event={event}
            secret_token={secretToken || ""}
            tickets={tickets}
          />

          <Stack spacing={2} direction={"row"} mt={5}>
            <StyledButton
              size="md"
              bgColor={PALLETTE.orange}
              onClick={() => {
                setShowDeleteModal(true);
              }}
              style={{ width: "fit-content", maxWidth: "350px" }}
            >
              {t("manage_event.delete_button", { event_name: event.name })}
            </StyledButton>
          </Stack>
        </Box>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default ManageEventPage;
