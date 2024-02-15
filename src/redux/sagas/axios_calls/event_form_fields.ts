import axios from "axios";
import { IEventFormFieldInput } from "../../../types";

interface ReturnValue {
  success?: boolean;
  error?: string;
}

export const handleEventFormFieldsSubmit = async (
  eventId: number,
  values: { formFields: IEventFormFieldInput[] }
) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/form-fields`,
      values.formFields,
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
