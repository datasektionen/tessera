import { useTranslation } from "react-i18next";
import PALLETTE from "../../../../theme/pallette";
import { IEventFormFieldResponse, ITicket } from "../../../../types";
import StyledText from "../../../text/styled_text";
import { LabelValue, TicketDetailWrapper } from "./ticket_utils";
import { Box, Grid } from "@mui/joy";

interface TicketEventFormProps {
  ticket: ITicket;
  onNull: () => void;
}

const TicketEventForm: React.FC<TicketEventFormProps> = ({
  ticket,
  onNull,
}) => {
  const { t } = useTranslation();

  const event_form_responses =
    ticket?.event_form_responses || [];

  if (event_form_responses.length === 0) {
    onNull();
    return null;
  }

  return (
    <TicketDetailWrapper>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          {t("manage_event.tickets.event_form.title")}
        </StyledText>
        <Grid container spacing={3} columns={12}>
          {event_form_responses.map((response: IEventFormFieldResponse) => {
            return (
              <Grid xs={6}>
                <StyledText
                  level="body-md"
                  color={PALLETTE.charcoal}
                  fontWeight={600}
                >
                  {response.event_form_field?.name}{" "}
                  {response.event_form_field?.is_required && "*"}
                </StyledText>

                <StyledText
                  level="body-md"
                  color={PALLETTE.charcoal}
                  fontWeight={400}
                >
                  {response.value}
                </StyledText>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </TicketDetailWrapper>
  );
};

export default TicketEventForm;
