import axios from "axios";
import {
  IEventFormField,
  IEventFormFieldInput,
  IGuestCustomer,
} from "../../../types";
import { toast } from "react-toastify";

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
  ticketRequestId: number,
  isGuestCustomer?: boolean,
  guestCustomer?: IGuestCustomer
) => {
  try {
    // if guest: /guest-customer/:ugkthid/events/:eventID/ticket-requests/:ticketRequestID/form-fields
    // else: /events/${event_id}/ticket-requests/${ticketRequestId}/form-fields

    let url = `${process.env.REACT_APP_BACKEND_URL}`;
    url += isGuestCustomer
      ? `/guest-customer/${
          guestCustomer?.ug_kth_id
        }/events/${event_id}/ticket-requests/${ticketRequestId}/form-fields?request_token=${guestCustomer?.request_token!}`
      : `/events/${event_id}/ticket-requests/${ticketRequestId}/form-fields`;

    const response = await axios.put(url, formFieldValues, {
      withCredentials: !isGuestCustomer,
    });

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

export const getEventFormFields = async (
  eventId: number
): Promise<IEventFormField[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/form-fields`,
      {
        withCredentials: true,
      }
    );

    const event_form_fields = response.data.map((formField: any) => {
      return {
        id: formField.ID,
        name: formField.name,
        description: formField.description,
        type: formField.type,
        is_required: formField.is_required,
        event_id: formField.event_id,
      } as IEventFormField;
    });

    return event_form_fields;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message;

    toast.error(errorMessage);
    return [];
  }
};
