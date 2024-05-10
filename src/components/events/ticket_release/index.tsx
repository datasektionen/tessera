import {
  Box,
  Chip,
  IconButton,
  Link,
  List,
  ListItem,
  Sheet,
  Stack,
  Tooltip,
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
import { ListItemText, useMediaQuery, useTheme } from "@mui/material";
import {
  ticketReleaseHasClosed,
  ticketReleaseHasNotOpened,
  ticketReleaseHasOpened,
} from "../../../utils/event_open_close";
import TicketReleaseHasOpened from "./ticket_release_has_opened";
import TicketReleaseHasClosed from "./ticket_release_has_closed";
import TicketReleaseHasNotOpened from "./ticket_release_has_not_opened";
import StyledText from "../../text/styled_text";
import InformationModal from "../../modal/information";
import { Trans, useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import axios from "axios";
import { NotificationsActive } from "@mui/icons-material";
import { toast } from "react-toastify";
import TicketReleaseMethodDetail from "./ticket_release_method/detailed_info";

interface TicketReleaseProps {
  ticketRelease: ITicketRelease;
}

const renderTicketReleaseStatus = (
  ticketRelease: ITicketRelease,
  timestamp: number
) => {
  if (ticketReleaseHasNotOpened(ticketRelease, timestamp)) {
    return <TicketReleaseHasNotOpened ticketRelease={ticketRelease} />;
  } else if (ticketReleaseHasClosed(ticketRelease, timestamp)) {
    return <TicketReleaseHasClosed ticketRelease={ticketRelease} />;
  } else if (ticketReleaseHasOpened(ticketRelease, timestamp)) {
    return <TicketReleaseHasOpened ticketRelease={ticketRelease} />;
  }
};

const TicketRelease: React.FC<TicketReleaseProps> = ({ ticketRelease }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const { t } = useTranslation();
  const { timestamp } = useSelector((state: RootState) => state.timestamp);
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Sheet
      variant="outlined"
      sx={{
        p: isScreenSmall ? 0.5 : 2,
        width: isScreenSmall ? "100%" : "inherit",
      }}
      style={{
        borderColor: PALLETTE.cerise,
        backgroundColor: "transparent",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={"center"}
        spacing={2}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        {ticketRelease.is_reserved! && (
          <Box>
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
      </Stack>

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
        <div>
          <ReactMarkdown>{ticketRelease.description}</ReactMarkdown>
        </div>
      </StyledText>
      {!ticketReleaseHasClosed(ticketRelease, timestamp!) && [
        <StyledText
          level="body-sm"
          key="ticket_release_method"
          color={PALLETTE.charcoal_see_through}
          fontSize={16}
          sx={{
            mb: 1,
          }}
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
          {" - "}
          {ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod?.id ===
            4 && (
            <StyledText
              level="body-sm"
              key="ticket_release_method"
              color={PALLETTE.charcoal}
              fontSize={16}
              style={{
                textDecoration: "italic",
              }}
              sx={{
                mb: 1,
              }}
            >
              {ticketRelease.ticketReleaseMethodDetail.method_description}
            </StyledText>
          )}
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

      {renderTicketReleaseStatus(ticketRelease, timestamp!)}
      <TicketReleaseMethodDetail
        key="ticket_release_method_detail"
        ticketRelease={ticketRelease}
      />
    </Sheet>
  );
};

export default TicketRelease;
