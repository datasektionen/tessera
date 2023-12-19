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

  return (
    <Box>
      <Box>
        <StyledText
          color={PALLETTE.charcoal}
          level="body-lg"
          fontSize={32}
          style={{ marginBottom: "16px" }}
        >
          Edit Ticket Releases
        </StyledText>
        <StyledText color={PALLETTE.charcoal} level="body-sm">
          Create ticket releases for your event. You can create as many as you
          want, and you can edit them later.
        </StyledText>

        <StyledText
          color={PALLETTE.charcoal}
          level="body-sm"
          style={{ marginTop: "16px" }}
        >
          Select a ticket release to edit it.
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
                No ticket releases created yet.
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
              Add Ticket Release
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
                Edit Tickets
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
