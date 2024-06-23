import { useEffect, useState } from "react";
import { ITicketRelease } from "../../../../types";
import { Box } from "@mui/joy";
import StyledText from "../../../text/styled_text";
import { Trans, useTranslation } from "react-i18next";
import PALLETTE from "../../../../theme/pallette";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import {
  beforeWindowDuration,
  ticketReleaseHasClosed,
  ticketReleaseHasNotOpened,
  ticketReleaseHasOpened,
} from "../../../../utils/event_open_close";
import TicketReleaseHasNotOpened from "../ticket_release_has_not_opened";
import { time } from "console";
import InfoIcon from "@mui/icons-material/Info";

type TicketReleaseMethod =
  | "First Come First Serve Lottery"
  | "Reserved Ticket Release"
  | null;

interface TicketReleaseMethodData {
  fcfsl?: {
    open_window_duration: number;
  };
  reserved?: {
    ticket_release_id: number;
  };
}

interface TicketReleaseMethodDetailProps {
  ticketRelease: ITicketRelease;
}

const TicketReleaseMethodDetail: React.FC<TicketReleaseMethodDetailProps> = ({
  ticketRelease,
}) => {
  const [data, setData] = useState<TicketReleaseMethodData>({});
  const [method, setMethod] = useState<TicketReleaseMethod>(null);
  const { timestamp } = useSelector((state: RootState) => state.timestamp);

  useEffect(() => {
    if (
      ticketRelease.ticket_release_method_detail.ticket_release_method!.name ===
      "First Come First Serve Lottery"
    ) {
      setData({
        fcfsl: {
          open_window_duration:
            ticketRelease.ticket_release_method_detail.open_window_duration!,
        },
      });
      setMethod("First Come First Serve Lottery");
    } else if (
      ticketRelease.ticket_release_method_detail.ticket_release_method!.name ===
      "Reserved Ticket Release"
    ) {
      setData({
        reserved: {
          ticket_release_id: ticketRelease.ticket_release_method_detail.id,
        },
      });
      setMethod("Reserved Ticket Release");
    }
  }, [ticketRelease]);

  const { t } = useTranslation();

  if (!method) {
    return null;
  }

  return (
    <Box mt={2}>
      {method === "First Come First Serve Lottery" && (
        <StyledText
          color={PALLETTE.charcoal}
          level="body-md"
          fontSize={15}
          fontWeight={500}
        >
          <Trans
            i18nKey="event.ticket_release.method_info.fcfsl"
            values={{ duration: data.fcfsl?.open_window_duration }}
          >
            Request your ticket within the first
            <StyledText
              color={PALLETTE.orange}
              level="body-md"
              fontSize={17}
              fontWeight={700}
            >
              {data.fcfsl?.open_window_duration}
            </StyledText>
            minutes of the ticket release opening in order to be entered into
            the lottery.
          </Trans>
        </StyledText>
      )}
    </Box>
  );
};

export default TicketReleaseMethodDetail;
