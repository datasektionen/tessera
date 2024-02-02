import { useState, useEffect } from "react";
import axios from "axios";

export const useCanAccessEvent = async (eventID: string) => {
  if (!eventID) {
    return null;
  }

  let canAccess = false;

  await axios
    .get(process.env.REACT_APP_BACKEND_URL + `/events/${eventID}/manage`, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.status === 200) {
        canAccess = true;
      } else {
        canAccess = false;
      }
    })
    .catch((err) => {
      console.log(err);
      canAccess = false;
    });

  return canAccess;
};
