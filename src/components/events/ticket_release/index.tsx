import { Sheet, Stack, Typography } from "@mui/joy";
import { ITicketRelease } from "../../../types";
import PALLETTE from "../../../theme/pallette";
import TicketType from "../ticket_types";

interface TicketReleaseProps {
  ticketRelease: ITicketRelease;
}

const TicketRelease: React.FC<TicketReleaseProps> = ({ ticketRelease }) => {
  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 2,
      }}
      style={{
        borderColor: PALLETTE.cerise,
        backgroundColor: "transparent",
      }}
    >
      <Typography
        level="h4"
        fontFamily={"Josefin sans"}
        style={{
          color: PALLETTE.charcoal,
        }}
      >
        {ticketRelease.name}
      </Typography>
      <Typography level="body-sm" fontFamily={"Josefin sans"}>
        {ticketRelease.description}
      </Typography>

      <Stack spacing={2} sx={{ p: 0 }} mt={2}>
        {ticketRelease.ticketTypes!.length > 0 ? (
          ticketRelease.ticketTypes!.map((ticketType) => {
            return <TicketType ticketType={ticketType} />;
          })
        ) : (
          <Typography level="body-sm" fontFamily={"Josefin sans"}>
            No tickets available
          </Typography>
        )}
      </Stack>
    </Sheet>
  );
};

export default TicketRelease;
