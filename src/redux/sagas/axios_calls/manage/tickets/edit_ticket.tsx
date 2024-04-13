import axios from "axios";
import { ITicket } from "../../../../../types";
import { toast } from "react-toastify";

interface ITicketUpdateResponse {
  payment_deadline?: string;
  checked_in?: boolean;
}

export const sendTicketUpdateRequest = async (
  eventID: number,
  ticketID: number,
  body: ITicketUpdateResponse
) => {
  // put /events/:eventID/tickets/:ticketID
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventID}/tickets/${ticketID}`,
      body,
      {
        withCredentials: true,
      }
    );
    if (response.status !== 200) {
      setTimeout(() => {
        toast.error("Failed to update ticket");
      }, 500);
    } else {
      setTimeout(() => {
        toast.success("Ticket updated successfully");
      }, 500);
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || error.message;
    setTimeout(() => {
      toast.error(errorMessage);
    }, 500);
  }
};
