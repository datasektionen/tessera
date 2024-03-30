import { toast } from "react-toastify";
import { AppDispatch } from "../../../store";
import { ITicketRelease } from "../../../types";
import { getEventRequest } from "../../features/eventSlice";
import axios from "axios";

const handleDeleteTicketRelease = async (
  dispatch: AppDispatch,
  ticketRelease: ITicketRelease
) => {
  const response = await axios.delete(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/events/${ticketRelease.eventId!}/ticket-release/${ticketRelease.id}`,
    {
      withCredentials: true,
    }
  );

  if (response.status === 200) {
    setTimeout(() => {
      toast.success("Ticket release deleted successfully");
    }, 500);
    dispatch(
      getEventRequest({
        id: ticketRelease.eventId!,
        secretToken: "",
      })
    );
  } else {
    const errorMessage = response.data?.message || "Something went wrong";
    toast.error(errorMessage);
  }
};

export default handleDeleteTicketRelease;
