import { Box, Input, Select, Option, Grid, Divider } from "@mui/joy"; // Import the Option component
import { IEvent, ITicketRelease } from "../../../types";
import Title from "../../text/title";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import EditTicketReleaseForm from "./edit_ticket_release_form";
import StyledButton from "../../buttons/styled_button";
import { useNavigate } from "react-router-dom";
import EditTicketTypeForm from "./edit_ticket_type_form";
import { generateEditTicketReleaseTicketTypes } from "../../../routes/def";
import { useTranslation } from "react-i18next";

interface EditTicketReleasesProps {
  ticket_releases: ITicketRelease[] | [];
  event: IEvent;
}

const EditTicketReleases: React.FC<EditTicketReleasesProps> = ({
  ticket_releases,
  event,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTicketRelease, setSelectedTicketRelease] = useState<
    number | null
  >(null);
  const { t } = useTranslation();

  return (
    <Box>
      <Box>
        <StyledText
          color={PALLETTE.charcoal}
          level="body-lg"
          fontSize={32}
          style={{ marginBottom: "16px" }}
        >
          {t("manage_event.edit.ticket_releases.title")}
        </StyledText>
        <StyledText color={PALLETTE.charcoal} level="body-sm">
          {t("manage_event.edit.ticket_releases.subtitle")}
        </StyledText>

        <StyledText
          color={PALLETTE.charcoal}
          level="body-sm"
          style={{ marginTop: "16px" }}
        >
          {t("manage_event.edit.ticket_releases.select")}
        </StyledText>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="middle"
        >
          <Grid>
            {ticket_releases.length > 0 ? (
              <Select
                value={selectedTicketRelease}
                onChange={(_, newValue) => {
                  setSelectedTicketRelease(newValue as number);
                }}
                sx={{ width: "300px" }}
                placeholder="Select a ticket release"
              >
                {ticket_releases.map((release) => {
                  console.log(release.id);
                  return (
                    <Option key={release.id} value={release.id}>
                      {release.name}
                    </Option> // Use the correct component and add a key prop
                  );
                })}
              </Select>
            ) : (
              <StyledText color={PALLETTE.charcoal} level="body-sm">
                {t("manage_event.edit.ticket_releases.no_ticket_releases")}
              </StyledText>
            )}
          </Grid>
          <Grid>
            <StyledButton
              color={PALLETTE.charcoal}
              onClick={() => {
                navigate(`/events/${event.id!}/edit/add-ticket-release`);
              }}
              size="md"
            >
              {t("manage_event.edit.ticket_releases.add")}
            </StyledButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: "16px" }}>
        {selectedTicketRelease && (
          <>
            <StyledButton
              color={PALLETTE.charcoal}
              bgColor={PALLETTE.cerise}
              onClick={() => {
                navigate(
                  generateEditTicketReleaseTicketTypes(
                    event.id!,
                    selectedTicketRelease!
                  )
                );
              }}
              size="md"
              style={{
                marginBottom: "16px",
              }}
            >
              <StyledText
                level="body-sm"
                color={PALLETTE.charcoal}
                fontSize={32}
              >
                {t("manage_event.edit.ticket_releases.edit_ticket_types")}
              </StyledText>
            </StyledButton>
          </>
        )}
        <EditTicketReleaseForm
          ticketRelease={ticket_releases.find(
            (release) => release.id === selectedTicketRelease
          )}
          event_date={event.date}
        />
      </Box>
    </Box>
  );
};

export default EditTicketReleases;
