import { Button, IconButton, Typography } from "@mui/joy";
import PALLETTE from "../../../theme/pallette";
import { useEffect, useState } from "react";
import { ITicketRelease } from "../../../types";
import { differenceInSeconds, intervalToDuration } from "date-fns";
import { useTranslation } from "react-i18next";
import RefreshIcon from "@mui/icons-material/Refresh";
import StyledText from "../../text/styled_text";

const TicketReleaseCountdown: React.FC<{
  ticketRelease: ITicketRelease;
  fw: number;
  fs: number;
  useOpen?: boolean;
}> = ({ ticketRelease, fw, fs, useOpen }) => {
  const targetDate = useOpen ? ticketRelease.open : ticketRelease.close;

  const calculateDuration = () => {
    return intervalToDuration({
      start: new Date(),
      end: targetDate,
    });
  };

  const [duration, setDuration] = useState(calculateDuration());

  useEffect(() => {
    // Check if current date is past the target date
    if (new Date().getTime() >= targetDate) {
      clearInterval(1);
      return;
    }

    // Set up a timer to tick down every second
    const intervalId = setInterval(() => {
      setDuration(calculateDuration());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [duration, targetDate]);

  const formatTime = (time: number | undefined) => {
    // Default to 0 if time is undefined
    return String(time ?? 0);
  };

  const { t } = useTranslation();

  if (useOpen && new Date().getTime() >= ticketRelease.open) {
    return (
      <>
        <IconButton onClick={() => setDuration(calculateDuration())} sx={{mt: 2}}>
          <StyledText
            color={PALLETTE.cerise}
            level="body-md"
            onClick={() => {
              window.location.reload();
            }}
            fontSize={fs}
            fontWeight={fw}
            startDecorator={<RefreshIcon />}
          >
            Refresh
          </StyledText>
        </IconButton>
      </>
    );
  }

  return (
    <>
      <Typography
        level="body-md"
        fontFamily={"Josefin Sans"}
        fontSize={fs}
        fontWeight={fw}
        style={{
          color: PALLETTE.cerise,
        }}
      >
        {duration.months! > 0 && (
          <span>
            {formatTime(duration.months)} {t("event.ticket_release.month")}
          </span>
        )}{" "}
        {duration.days! > 0 && (
          <span>
            {formatTime(duration.days)} {t("event.ticket_release.day")}
          </span>
        )}{" "}
        {duration.hours! > 0 && (
          <span>
            {formatTime(duration.hours)} {t("event.ticket_release.hour")}
          </span>
        )}{" "}
        {duration.minutes! > 0 && (
          <span>
            {formatTime(duration.minutes)} {t("event.ticket_release.minute")}
          </span>
        )}{" "}
        {duration.seconds! > 0 && (
          <span>
            {formatTime(duration.seconds)} {t("event.ticket_release.second")}
          </span>
        )}
      </Typography>
    </>
  );
};

export default TicketReleaseCountdown;
