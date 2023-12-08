import { Link, List, ListItem, Sheet, Stack, Typography } from "@mui/joy";
import { ITicketRelease } from "../../../types";
import PALLETTE from "../../../theme/pallette";
import TicketType from "../ticket_types";

import TicketReleaseCountdown from "./tr_countdown";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ShoppingCartItem } from "../../../redux/features/ticketRequestSlice";
import React, { useEffect } from "react";
import { ListItemText } from "@mui/material";
import {
  ticketReleaseHasClosed,
  ticketReleaseHasNotOpened,
  ticketReleaseHasOpened,
} from "../../../utils/event_open_close";
import TicketReleasHasOpened from "./ticket_release_has_opened";
import TicketReleaseHasClosed from "./ticket_release_has_closed";
import TicketReleasHasNotOpened from "./ticket_release_has_not_opened";

interface TicketReleaseProps {
  ticketRelease: ITicketRelease;
}

const renderTicketReleaseStatus = (ticketRelease: ITicketRelease) => {
  if (ticketReleaseHasNotOpened(ticketRelease)) {
    return <TicketReleasHasNotOpened ticketRelease={ticketRelease} />;
  } else if (ticketReleaseHasClosed(ticketRelease)) {
    return <TicketReleaseHasClosed ticketRelease={ticketRelease} />;
  } else if (ticketReleaseHasOpened(ticketRelease)) {
    return <TicketReleasHasOpened ticketRelease={ticketRelease} />;
  }
};

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
        {ticketRelease.description} - This release uses{" "}
        <Link
          href={
            "/ticket-release-method/" +
            ticketRelease.ticketReleaseMethodDetail?.id
          }
          target="_blank"
        >
          {ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod?.name}
        </Link>
      </Typography>

      {renderTicketReleaseStatus(ticketRelease)}
    </Sheet>
  );
};

export default TicketRelease;
