import { useState, useEffect } from "react";
import axios from "axios";

export const useCanAccessEvent = (eventID: string) => {
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    if (!eventID || canAccess) {
      return;
    }
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/events/${eventID}/manage`)
      .then((res) => {
        if (res.status === 200) {
          setCanAccess(true);
        } else {
          setCanAccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setCanAccess(false);
      });
  }, [eventID]);

  return canAccess;
};


