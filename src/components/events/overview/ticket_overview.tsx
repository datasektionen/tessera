import { Box, Grid, Skeleton, Stack } from "@mui/joy";

import { format } from "date-fns";
import React, { useEffect } from "react";
import BorderBox from "../../wrappers/border_box";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useTranslation } from "react-i18next";
import { ITicket } from "../../../types";
import { OverviewBorderBoxWrapper } from "./overvier_borde_box_wrapper";
import OverviewStatisticDisplay from "./overview_stat_display";

interface IEventTicketOverviewProps {
  eventID: number;
  tickets: ITicket[];
}

const EventTicketOverview: React.FC<IEventTicketOverviewProps> = ({
  eventID,
  tickets,
}) => {
  // Get number of ticket request
  const getNumberOfTicketRequest = () => {
    let totalTicketRequest = 0;
    tickets.forEach((ticket) => {
      if (!ticket.ticket_request?.deleted_at) {
        totalTicketRequest++;
      }
    });
    return totalTicketRequest;
  };

  const getTotalIncome = () => {
    let income = 0;
    tickets.forEach((ticket) => {
      if (ticket.is_paid && ticket.transaction) {
        income += ticket.transaction.amount;
      }
    });

    income = Math.round((income / 100) * 100) / 100;

    return `SEK ${income}`;
  };

  const { t } = useTranslation();

  return (
    <>
      <OverviewStatisticDisplay
        title="manage_event.overview.num_ticket_requests"
        value={getNumberOfTicketRequest()}
        changeText="" // Optional parameter if there's a dynamic change to be displayed
        color="cerise_dark"
      />
      <OverviewStatisticDisplay
        title="manage_event.overview.total_income"
        value={getTotalIncome()}
        changeText="" // Optional parameter if there's a dynamic change to be displayed
        color="cerise_dark"
      />
    </>
  );
};

export default EventTicketOverview;
