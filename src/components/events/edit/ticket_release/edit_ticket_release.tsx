import {
  Box,
  Input,
  Select,
  Option,
  Grid,
  Divider,
  Stack,
  ListDivider,
} from "@mui/joy"; // Import the Option component
import { IEvent, ITicketRelease } from "../../../../types";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { AppDispatch } from "../../../../store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import EditTicketReleaseForm from "./edit_ticket_release_form";
import StyledButton from "../../../buttons/styled_button";
import { useNavigate } from "react-router-dom";
import {
  generateEditTicketReleaseAddons,
  generateEditTicketReleaseTicketTypes,
} from "../../../../routes/def";
import { useTranslation } from "react-i18next";
import Title from "../../../text/title";

interface EditTicketReleaseProps {
  ticketRelease: ITicketRelease;
  event: IEvent;
}

const EditTicketRelease: React.FC<EditTicketReleaseProps> = ({
  ticketRelease,
  event,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: "16px" }}>
      <Title fontSize={36}>
        {t("manage_event.edit.ticket_releases.edit_name", {
          name: ticketRelease.name,
        })}
      </Title>
      <Stack spacing={2} direction={"row"} mb={2}>
        <StyledButton
          color={PALLETTE.charcoal}
          bgColor={PALLETTE.cerise}
          onClick={() => {
            navigate(
              generateEditTicketReleaseTicketTypes(
                event?.id!,
                ticketRelease.id!
              )
            );
          }}
          size="md"
        >
          <StyledText level="body-sm" color={PALLETTE.charcoal} fontSize={20}>
            {t("manage_event.edit.ticket_releases.edit_ticket_types")}
          </StyledText>
        </StyledButton>
        <StyledButton
          color={PALLETTE.charcoal}
          bgColor={PALLETTE.cerise}
          onClick={() => {
            navigate(
              generateEditTicketReleaseAddons(event?.id!, ticketRelease.id!)
            );
          }}
          size="md"
        >
          <StyledText level="body-sm" color={PALLETTE.charcoal} fontSize={20}>
            {t("manage_event.edit.ticket_releases.edit_addons")}
          </StyledText>
        </StyledButton>
      </Stack>
      <ListDivider sx={{ my: 1 }} />
      <EditTicketReleaseForm
        ticketRelease={ticketRelease}
        event_date={event?.date!}
      />
    </Box>
  );
};

export default EditTicketRelease;
