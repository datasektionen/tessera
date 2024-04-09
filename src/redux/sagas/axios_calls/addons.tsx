import axios from "axios";
import { IAddon, ISelectedAddon } from "../../../types";
import { toast } from "react-toastify";

async function updateAddons(
  eventID: number,
  ticketReleaseID: number,
  addons: IAddon[]
) {
  // /events/:eventID/ticket-release/:ticketReleaseID/add-ons
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventID}/ticket-release/${ticketReleaseID}/add-ons`,
      [...addons],
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      setTimeout(() => {
        toast.error("Failed to update addons");
      }, 500);
    } else {
      setTimeout(() => {
        toast.success("Addons updated successfully");
      }, 500);
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || error.message;
    setTimeout(() => {
      toast.error(errorMessage);
    }, 500);
  }
}

async function updateTicketAddons(
  selectedAddons: ISelectedAddon[],
  ticketRequestID: number,
  ticketReleaseID: number
) {
  // /ticket-release/:ticketReleaseID/ticket-requests/:ticketRequestID/add-ons
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/ticket-releases/${ticketReleaseID}/ticket-requests/${ticketRequestID}/add-ons`,
      selectedAddons,
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      setTimeout(() => {
        toast.error("Failed to update addons");
      }, 500);
    } else {
      setTimeout(() => {
        toast.success("Addons updated successfully");
      }, 500);
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || error.message;
    setTimeout(() => {
      toast.error(errorMessage);
    }, 500);
  }
}

export { updateAddons, updateTicketAddons };
