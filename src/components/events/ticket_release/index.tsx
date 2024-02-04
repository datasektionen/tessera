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
import { Trans, useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

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
  const { t } = useTranslation();

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
              {t("event.reserved")}
            </StyledText>
          </Chip>
        </Box>
      )}
      <StyledText
        level="h4"
        fontSize={24}
        color={PALLETTE.charcoal}
        style={{
          color: PALLETTE.charcoal,
        }}
      >
        {ticketRelease.name}
      </StyledText>
      <StyledText level="body-sm" color={PALLETTE.charcoal} fontSize={16}>
        <div style={{ margin: 0 }}>
          <ReactMarkdown>{ticketRelease.description}</ReactMarkdown>
        </div>
      </StyledText>
      {!ticketReleaseHasClosed(ticketRelease) && [
        <StyledText
          level="body-sm"
          key="ticket_release_method"
          color={PALLETTE.charcoal_see_through}
          fontSize={16}
        >
          <Trans
            i18nKey="event.ticket_release.method"
            values={{
              method:
                ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod
                  ?.name,
            }}
          >
            This release uses
            <Link target="_blank" onClick={() => setModalIsOpen(true)}>
              {
                ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod
                  ?.name
              }
            </Link>
          </Trans>
        </StyledText>,
        <InformationModal
          key={"ticket_release_method_modal"}
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
        </InformationModal>,
      ]}

      {renderTicketReleaseStatus(ticketRelease)}
    </Sheet>
  );
};

export default TicketRelease;
