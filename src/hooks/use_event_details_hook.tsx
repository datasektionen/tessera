import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getEventRequest } from "../redux/features/eventSlice";
import { fetchEventTicketsStart } from "../redux/features/eventTicketsSlice";

export function useEventDetails(eventID: string) {
  const dispatch = useDispatch();
  const eventDetail = useSelector((state: RootState) => state.eventDetail);
  const eventTickets = useSelector((state: RootState) => state.eventTickets);

  useEffect(() => {
    if (eventID) {
      dispatch(getEventRequest({ id: parseInt(eventID), secretToken: "" }));
      dispatch(fetchEventTicketsStart(parseInt(eventID)));
    }
  }, [dispatch, eventID]);

  return { eventDetail, eventTickets };
}
