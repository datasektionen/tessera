import React, { useEffect, useState } from "react";
import { ITicketRelease } from "../../../../types";
import { Box } from "@mui/joy";
import StyledText from "../../../text/styled_text";
import { Trans, useTranslation } from "react-i18next";
import PALLETTE from "../../../../theme/pallette";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

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
      ticketRelease.ticket_release_method_detail.ticket_release_method!
        .method_name === "First Come First Serve Lottery"
    ) {
      setData({
        fcfsl: {
          open_window_duration:
            ticketRelease.ticket_release_method_detail.open_window_duration!,
        },
      });
      setMethod("First Come First Serve Lottery");
    } else if (
      ticketRelease.ticket_release_method_detail.ticket_release_method!
        .method_name === "Reserved Ticket Release"
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

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = [];

    if (hours > 0) {
      result.push(`${hours} ${t("common.hour", { count: hours })}`);
    }

    if (minutes > 0 || (hours > 0 && remainingSeconds > 0)) {
      result.push(`${minutes} ${t("common.minute", { count: minutes })}`);
    }

    if (result.length === 0 || remainingSeconds > 0) {
      result.push(
        `${remainingSeconds} ${t("common.second", { count: remainingSeconds })}`
      );
    }

    return result.join(" ");
  };

  if (!method) {
    return null;
  }

  return (
    <Box mt={2}>
      {method === "First Come First Serve Lottery" && data.fcfsl && (
        <StyledText
          color={PALLETTE.charcoal}
          level="body-md"
          fontSize={15}
          fontWeight={500}
        >
          <Trans
            i18nKey="event.ticket_release.method_info.fcfsl"
            values={{
              duration: formatDuration(data.fcfsl.open_window_duration),
            }}
          >
            Requests made within the first
            <StyledText
              color={PALLETTE.cerise_dark}
              level="body-md"
              fontSize={17}
              fontWeight={700}
            >
              t
            </StyledText>
            of the release will be entered into the lottery.
          </Trans>
        </StyledText>
      )}
    </Box>
  );
};

export default TicketReleaseMethodDetail;
