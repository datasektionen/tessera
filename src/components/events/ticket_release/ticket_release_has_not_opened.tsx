import React from "react";
import { ITicketRelease } from "../../../types";
import { Typography } from "@mui/joy";
import PALLETTE from "../../../theme/pallette";
import TicketReleaseCountdown from "./tr_countdown";
import { useTranslation } from "react-i18next";

const TicketReleasHasNotOpened: React.FC<{
  ticketRelease: ITicketRelease;
}> = ({ ticketRelease }) => {
  const { t } = useTranslation();
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
        {t("event.ticket_release.tickets_available_in")}:
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
