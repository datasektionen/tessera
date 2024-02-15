// Refactored useCanAccessEvent to be a proper React hook
import { useState, useEffect } from "react";
import axios from "axios";

export const useCanAccessEvent = (eventID: string) => {
  const [canAccess, setCanAccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!eventID) {
      setCanAccess(null);
      return;
    }

    const fetchAccess = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/events/${eventID}/manage`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setCanAccess(true);
        } else {
          setCanAccess(false);
        }
      } catch (error) {
        console.error(error);
        setCanAccess(false);
      }
    };

    fetchAccess();
  }, [eventID]);

  return canAccess;
};
