import axios from "axios";
import { toast } from "react-toastify";

async function allocateSelectedTicket(
  eventID: number,
  ticketID: number
): Promise<void> {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventID}/tickets/${ticketID}/allocate`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      toast.success("Ticket allocated successfully");
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
  }
}

export default allocateSelectedTicket;
