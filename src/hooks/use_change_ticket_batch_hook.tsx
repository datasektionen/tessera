import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { IEvent, ITicketType } from "../types";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { fetchTicketTypesRequest } from "../redux/features/ticketTypeSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { generateRoute, ROUTES } from "../routes/def";
import { fetchEventTicketsStart } from "../redux/features/eventTicketsSlice";

const useChangeTicketBatch = (
  eventId: number,
  ticketReleaseID: number,
  ticketRequestID: number
) => {
  // PUT /events/:eventID/ticket-requests/:ticketRequestID/change-ticket-type

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const { ticketTypes, loading } = useSelector(
    (state: RootState) => state.ticketTypes
  );

  const onSave = async (ticketType: ITicketType) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/ticket-requests/${ticketRequestID}/change-ticket-type`,
        {
          ticket_type_id: ticketType.id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setTimeout(() => {
          toast.success("Ticket batch changed successfully");
        }, 300);
        dispatch(fetchEventTicketsStart(eventId));
      } else {
        const errorMessage = response.data.error || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response.data.error || "An error occurred";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getTicketBatches();
  }, []);

  const getTicketBatches = async () => {
    // /events/:eventID/ticket-release/:ticketReleaseID/ticket-types
    dispatch(
      fetchTicketTypesRequest({
        eventId: eventId,
        ticketReleaseId: ticketReleaseID,
      })
    );
  };

  return {
    onSave,
    ticketTypes,
    loading,
  };
};

export default useChangeTicketBatch;
