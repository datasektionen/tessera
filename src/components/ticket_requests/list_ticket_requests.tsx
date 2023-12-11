import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ITicketRequest } from "../../types";
import { Box, Grid, IconButton, styled } from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

const StyledTicketRequestBox = styled(Box)(({ theme }) => ({
  border: "2px solid " + PALLETTE.charcoal,
  padding: theme.spacing(1),
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    transition: "all 0.2s ease-in-out",
    border: "2px solid " + PALLETTE.cerise,
  },
}));

interface TicketRequestsListProps {
  ticketRequests: ITicketRequest[];
}

const TicketRequestsList: React.FC<TicketRequestsListProps> = ({
  ticketRequests,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedTicketRequest, setSelectedTicketRequest] = useState<number>(0);

  const displayedRequests = showAll
    ? ticketRequests
    : ticketRequests.slice(0, 1);

  if (ticketRequests.length === 0) {
    return (
      <Box mt={2}>
        <StyledText color={PALLETTE.charcoal} level="body-md">
          No requests yet
        </StyledText>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      {displayedRequests.map((request, index) => (
        <StyledTicketRequestBox
          key={index}
          my={1}
          style={{
            borderColor: selectedTicketRequest === index ? PALLETTE.cerise : "",
          }}
          onClick={() => setSelectedTicketRequest(index)}
        >
          <Grid
            container
            justifyContent="flex-start"
            spacing={2}
            style={{
              padding: "8px",
            }}
          >
            <Grid>
              <StyledText
                color={PALLETTE.charcoal}
                level="body-md"
                fontWeight={700}
              >
                {request.ticket_type!.name} -
                <StyledText
                  color={PALLETTE.charcoal}
                  level="body-md"
                  fontWeight={500}
                >
                  {" "}
                  SEK {request.ticket_type!.price}
                </StyledText>
              </StyledText>
            </Grid>
          </Grid>
        </StyledTicketRequestBox>
      ))}
      {ticketRequests.length > 1 && (
        <IconButton
          onClick={() => setShowAll(!showAll)}
          style={{
            backgroundColor: PALLETTE.charcoal_see_through,
            marginTop: "32px",
          }}
        >
          <StyledText
            color={PALLETTE.charcoal}
            fontWeight={500}
            level="body-sm"
          >
            {showAll ? "Show less" : "Show all"}
          </StyledText>

          <ExpandMoreIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default TicketRequestsList;
