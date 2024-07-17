import { Box, Grid, Stack } from "@mui/joy";
import { useEventSiteVisits } from "../../../hooks/event/use_event_details_hook";
import { IEventSiteVisit } from "../../../types";
import BorderBox from "../../wrappers/border_box";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { OverviewBorderBoxWrapper } from "./overview_borde_box_wrapper";
import OverviewStatisticDisplay from "./overview_stat_display";
interface IEventSiteVisitProps {
  eventID: number;
}

const EventSiteVisit: React.FC<IEventSiteVisitProps> = ({ eventID }) => {
  const { eventSiteVisits, loading, error } = useEventSiteVisits(eventID!);

  // Function that gets the string of when the last week measurement was made
  // if it was around 1 week ago it should say "1 week ago"
  // Otherwise it should say the date and time of the last week measurement
  // like 5 days ago
  const getLastWeekDate = () => {
    if (eventSiteVisits && eventSiteVisits.last_week_date) {
      const lastWeek = new Date(eventSiteVisits.last_week_date);
      const now = new Date();
      const diff = now.getTime() - lastWeek.getTime();
      const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

      // If NaN diffInDays return ""
      if (isNaN(diffInDays)) {
        return "";
      }

      if (diffInDays === 0) {
        return "Today";
      }

      if (diffInDays < 7) {
        return `since ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
      } else {
        const diffInWeeks = Math.floor(diffInDays / 7);
        return `since ${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
      }
    }
  };

  const { t } = useTranslation();

  if (loading || !eventSiteVisits) {
    return null;
  }

  return (
    <>
      <OverviewStatisticDisplay
        title="manage_event.overview.site_visits"
        value={eventSiteVisits.total_site_visits}
        changeText={`+ ${
          eventSiteVisits.total_site_visits -
          eventSiteVisits.total_site_visits_last_week
        } ${getLastWeekDate()}`}
        color="cerise_dark"
      />
      <OverviewStatisticDisplay
        title="manage_event.overview.unique_visitors"
        value={eventSiteVisits.unique_visitors}
        changeText={`+ ${
          eventSiteVisits.unique_visitors -
          eventSiteVisits.unique_visitors_last_week
        } ${getLastWeekDate()}`}
        color="cerise_dark"
      />
      <OverviewStatisticDisplay
        title="manage_event.overview.num_ticket_requests"
        value={eventSiteVisits.num_ticket_orders}
        changeText={`+ ${
          eventSiteVisits.num_ticket_orders -
          eventSiteVisits.num_ticket_orders_last_week
        } ${getLastWeekDate()}`}
        color="cerise_dark"
      />
      <OverviewStatisticDisplay
        title="manage_event.overview.total_income"
        value={eventSiteVisits.total_income}
        changeText={`+ ${
          eventSiteVisits.total_income - eventSiteVisits.total_income_last_week
        } ${getLastWeekDate()}`}
        color="cerise_dark"
      />
    </>
  );
};

export default EventSiteVisit;
