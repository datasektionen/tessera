import { Button, Typography } from "@mui/joy";
import PALLETTE from "../../../theme/pallette";
import { useEffect, useState } from "react";
import { ITicketRelease } from "../../../types";
import { differenceInSeconds, intervalToDuration } from "date-fns";

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
          <span>{formatTime(duration.months)} month(s) </span>
        )}
        {duration.days! > 0 && <span>{formatTime(duration.days)} day(s) </span>}
        {duration.hours! > 0 && (
          <span>{formatTime(duration.hours)} hour(s) </span>
        )}
        {duration.minutes! > 0 && (
          <span>{formatTime(duration.minutes)} minute(s) </span>
        )}
        {duration.seconds! > 0 && (
          <span>{formatTime(duration.seconds)} second(s)</span>
        )}
      </Typography>
    </>
  );
};

export default TicketReleaseCountdown;
