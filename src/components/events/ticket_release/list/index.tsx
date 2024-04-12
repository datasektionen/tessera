import { Autocomplete, Box, Divider, Input, Stack, TextField } from "@mui/joy";
import { ITicketRelease } from "../../../../types";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { useEffect, useState } from "react";
import {
  ticketReleaseHasClosed,
  ticketReleaseHasOpened,
} from "../../../../utils/event_open_close";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Fuse from "fuse.js";

interface ListEventTicketReleasesProps {
  ticketReleases: ITicketRelease[];
  setSelectedTicketRelease: (ticketRelease: ITicketRelease) => void;
}

const ListEventTicketReleases: React.FC<ListEventTicketReleasesProps> = ({
  ticketReleases,
  setSelectedTicketRelease,
}) => {
  const { timestamp } = useSelector((state: RootState) => state.timestamp);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const isOpen = (ticketRelease: ITicketRelease) => {
    return ticketReleaseHasOpened(ticketRelease, timestamp!);
  };

  const ticketReleasesWithStatus = ticketReleases.map((ticketRelease) => ({
    ...ticketRelease,
    status: isOpen(ticketRelease) ? "Open" : "Closed",
  }));

  const options = {
    keys: ["name", "status"],
    includeScore: true,
    threshold: 0.3, // Adjust this value to control the "forgiveness" of the search
  };

  const fuse = new Fuse(ticketReleasesWithStatus, options);

  // Group tickets by ticket release

  if (!ticketReleases || ticketReleases.length === 0) {
    return null;
  }

  let filteredTicketReleases = ticketReleases;

  if (searchTerm) {
    filteredTicketReleases = fuse
      .search(searchTerm)
      .map((result) => result.item);
  }

  return (
    <Box
      style={{
        position: "relative",
      }}
    >
      <Input
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value as string);
        }}
        placeholder="Search..."
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
      />

      <Stack
        direction="column"
        spacing={2}
        sx={{
          pt: 6,
        }}
      >
        {[...filteredTicketReleases]
          .sort((a, b) => {
            const dateA =
              a.created_at instanceof Date
                ? a.created_at
                : new Date(a.created_at);
            const dateB =
              b.created_at instanceof Date
                ? b.created_at
                : new Date(b.created_at);
            return dateA.getTime() - dateB.getTime();
          })
          .map((ticketRelease) => {
            return (
              <Box
                sx={{
                  borderColor: PALLETTE.cerise,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  pt: 0.5,
                  "&:hover": {
                    borderColor: PALLETTE.cerise_dark,
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  setSelectedTicketRelease(ticketRelease);
                }}
              >
                <StyledText
                  level="body-md"
                  fontSize={16}
                  color={PALLETTE.charcoal}
                  fontWeight={700}
                  sx={{
                    pl: 1,
                  }}
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  {ticketRelease.name}
                </StyledText>
                <StyledText
                  level="body-md"
                  fontSize={16}
                  color={
                    isOpen(ticketRelease)
                      ? PALLETTE.dark_green
                      : PALLETTE.dark_red
                  }
                  sx={{
                    pl: 1,
                  }}
                >
                  {isOpen(ticketRelease) ? "Open" : "Closed"}
                </StyledText>
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
};

export default ListEventTicketReleases;
