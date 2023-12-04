import { Sheet, Stack, Typography } from "@mui/joy";
import { ITicketRelease } from "../../../types";
import PALLETTE from "../../../theme/pallette";
import TicketType from "../ticket_types";
import {
  TicketReleaseHasClosed,
  TicketReleaseHasNotOpened,
  TicketReleaseHasOpened,
} from "../../../utils/event_open_close";
import TicketReleaseCountdown from "./tr_countdown";

interface TicketReleaseProps {
  ticketRelease: ITicketRelease;
}

const TicketRelease: React.FC<TicketReleaseProps> = ({ ticketRelease }) => {
  console.log("ticketRelease", ticketRelease);
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

      {TicketReleaseHasNotOpened(ticketRelease) ? (
        <>
          <Typography
            level="body-lg"
            fontFamily={"Josefin sans"}
            fontWeight={700}
            style={{
              color: PALLETTE.charcoal,
            }}
          >
            Tickets availability in:
          </Typography>
          <TicketReleaseCountdown
            ticketRelease={ticketRelease}
            fw={500}
            fs={24}
            useOpen={true}
          />
        </>
      ) : TicketReleaseHasClosed(ticketRelease) ? (
        <Typography
          level="body-sm"
          fontFamily={"Josefin sans"}
          style={{
            color: PALLETTE.charcoal,
          }}
        >
          Ticket release has closed
        </Typography>
      ) : (
        TicketReleaseHasOpened(ticketRelease) && (
          <>
            <Stack spacing={2} sx={{ p: 0 }} mt={2}>
              {ticketRelease.ticketTypes!.length > 0 ? (
                ticketRelease.ticketTypes!.map((ticketType, i) => {
                  const key = `${ticketRelease.name}-${i}`;
                  return <TicketType ticketType={ticketType} key={key} />;
                })
              ) : (
                <Typography level="body-sm" fontFamily={"Josefin sans"}>
                  No tickets available
                </Typography>
              )}
            </Stack>
            <div
              style={{
                marginTop: "1rem",
              }}
            >
              <Typography
                level="body-md"
                fontFamily={"Josefin sans"}
                fontWeight={500}
                style={{
                  color: PALLETTE.charcoal,
                  // ALign right
                }}
              >
                Tickets available for:
              </Typography>
              <TicketReleaseCountdown
                ticketRelease={ticketRelease}
                fw={500}
                fs={14}
                useOpen={false}
              />
            </div>
          </>
        )
      )}
    </Sheet>
  );
};

export default TicketRelease;
