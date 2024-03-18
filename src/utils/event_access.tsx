// Refactored useCanAccessEvent to be a proper React hook
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCanAccessEvent = (eventID: string) => {
  const [canAccess, setCanAccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

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
      } catch (error: any) {
        if (error.response.status === 401) {
          setTimeout(() => {
            toast.error("Please login to access this page!");
          }, 400);
          navigate("/login");
        } else if (error.response.status === 403) {
          setTimeout(() => {
            toast.error("Permissions denied!");
          }, 400);
          navigate("/events");
        }
        setCanAccess(false);
      }
    };

    fetchAccess();
  }, [eventID, navigate]);

  return canAccess;
};
