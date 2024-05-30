import axios from "axios";
import { IEvent, IEventForm, IEventPostReq } from "../../../types";

// Create event creation error
export class CreateEventError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CreateEventError";
  }
}

// Create event deletion error
export class DeleteEventError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DeleteEventError";
  }
}

export const deleteEvent = async (eventId: number): Promise<void> => {
  // Make a axios call to the backend to create the event
  // Return the event
  const res = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}`,
    {
      withCredentials: true,
    }
  );

  if (res.status === 200) {
    return;
  } else if (res.status === 400) {
    throw new DeleteEventError(res.data.error);
  } else {
    throw new DeleteEventError("Something went wrong!");
  }
};
