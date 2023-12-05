import React from "react";
import { ITicketRelease } from "../../../types";
import { Typography } from "@mui/joy";
import PALLETTE from "../../../theme/pallette";
import TicketReleaseCountdown from "./tr_countdown";

const TicketReleasHasNotOpened: React.FC<{
  ticketRelease: ITicketRelease;
}> = ({ ticketRelease }) => {
  return (
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
  );
};

export default TicketReleasHasNotOpened;
