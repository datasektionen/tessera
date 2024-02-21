import axios from "axios";
import { IEventFormFieldInput } from "../../../types";

interface ReturnValue {
  success?: boolean;
  error?: string;
}

export const handleEventFormFieldsSubmit = async (
  eventId: number,
  formData: IEventFormFieldInput
) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/form-fields`,
      formData,
      {
        withCredentials: true,
      }
    );
    return { success: true } as ReturnValue;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message;
    return {
      error: errorMessage,
    } as ReturnValue;
  }
};

export const handleEventFormFieldResponseSubmit = async (
  formFieldValues: { event_form_field_id: number; value: string }[],
  event_id: number,
  ticketRequestId: number
) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/events/${event_id}/ticket-requests/${ticketRequestId}/form-fields`,
      formFieldValues,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return { success: true } as ReturnValue;
    } else {
      return { error: "Failed to submit form field response" } as ReturnValue;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message;
    return {
      error: errorMessage,
    } as ReturnValue;
  }
};
