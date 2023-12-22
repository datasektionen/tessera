import {
  Box,
  Chip,
  Link,
  List,
  ListItem,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
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
import StyledText from "../../text/styled_text";
import InformationModal from "../../modal/information";

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
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

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
      {ticketRelease.is_reserved! && (
        <Box
          style={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <Chip variant="soft" color="primary">
            <StyledText
              color={PALLETTE.charcoal}
              fontSize={12}
              level="body-sm"
              fontWeight={600}
            >
              RESERVED
            </StyledText>
          </Chip>
        </Box>
      )}
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
        <Link target="_blank" onClick={() => setModalIsOpen(true)}>
          {ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod?.name}
        </Link>
      </Typography>
      <InformationModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        title={
          ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod?.name!
        }
      >
        <StyledText
          level="body-sm"
          color={PALLETTE.charcoal}
          fontSize={18}
          fontWeight={500}
        >
          {
            ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod
              ?.description
          }
        </StyledText>
      </InformationModal>

      {renderTicketReleaseStatus(ticketRelease)}
    </Sheet>
  );
};

export default TicketRelease;
