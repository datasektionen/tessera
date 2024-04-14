import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getEventRequest } from "../redux/features/eventSlice";
import { fetchEventTicketsStart } from "../redux/features/eventTicketsSlice";
import axios from "axios";
import { IEventSiteVisit } from "../types";

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
          process.env.REACT_APP_BACKEND_URL + `/events/${eventID}/site-visits`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setEventSiteVisits({
            total_site_visits: response.data.total_site_visits || 0,
            unique_visitors: response.data.unique_visitors || 0,
            difference_from_last_week: response.data.difference_from_last_week,
            last_week_date: new Date(response.data.last_week_date),
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
