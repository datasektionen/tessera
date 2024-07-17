import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getEventRequest } from "../../redux/features/eventSlice";
import { fetchEventTicketsStart } from "../../redux/features/eventTicketsSlice";
import axios from "axios";
import { IEventSiteVisit } from "../../types";

export function useEventDetails(eventID: number) {
  const dispatch = useDispatch();
  const eventDetail = useSelector((state: RootState) => state.eventDetail);
  const eventTickets = useSelector((state: RootState) => state.eventTickets);

  useEffect(() => {
    if (eventID) {
      dispatch(getEventRequest({ id: eventID, secretToken: "" }));
      dispatch(fetchEventTicketsStart(eventID));
    }
  }, [dispatch, eventID]);

  return { eventDetail, eventTickets };
}

export function useEventSiteVisits(eventID: number) {
  const [eventSiteVisits, setEventSiteVisits] =
    useState<IEventSiteVisit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (eventID) {
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL + `/events/${eventID}/overview`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setEventSiteVisits({
            total_site_visits: response.data.total_site_visits || 0,
            total_site_visits_last_week:
              response.data.total_site_visits_last_week || 0,
            unique_visitors: response.data.unique_visitors || 0,
            unique_visitors_last_week: response.data.return_visitors || 0,
            last_week_date: new Date(response.data.last_week_date),
            num_ticket_orders: response.data.num_ticket_requests || 0,
            num_ticket_orders_last_week:
              response.data.num_ticket_requests_last_week || 0,
            total_income: response.data.total_income || 0,
            total_income_last_week: response.data.total_income_last_week || 0,
          });
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [eventID]);

  return { eventSiteVisits, loading, error };
}
