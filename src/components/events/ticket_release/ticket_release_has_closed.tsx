import React from "react";
import { ITicketRelease } from "../../../types";
import { Typography } from "@mui/joy";
import PALLETTE from "../../../theme/pallette";

const TicketReleasHasClosed: React.FC<{
  ticketRelease: ITicketRelease;
}> = ({ ticketRelease }) => {
  return (
    <Typography
      level="body-sm"
      fontFamily={"Josefin sans"}
      fontSize={18}
      mt={1}
      fontWeight={700}
      style={{
        color: PALLETTE.charcoal,
      }}
    >
      Ticket release has closed
    </Typography>
  );
};

export default TicketReleasHasClosed;
