import { Box } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventRequest } from "../../redux/features/eventSlice";
import { RootState } from "../../store";
import { useCanAccessEvent } from "../../utils/event_access";
import { useTranslation } from "react-i18next";

export const useEventAccess = (eventID: string) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [canAccess, setCanAccess] = useState<boolean | null>(null);
  const canAccessEvent = useCanAccessEvent(eventID!);
  const { t } = useTranslation();

  const { event, loading, error } = useSelector(
    (state: RootState) => state.eventDetail
  );

  useEffect(() => {
    const fetchCanAccess: any = async () => {
      const ca = await canAccessEvent;

      if (ca === false) {
        navigate("/events/" + eventID);
      }

      setCanAccess(ca);
    };

    fetchCanAccess();
  }, [canAccessEvent]);

  useEffect(() => {
    if (eventID) {
      dispatch(
        getEventRequest({
          id: parseInt(eventID),
          secretToken: "",
        })
      );
    }
  }, [dispatch, eventID]);

  if (error) {
    navigate("/events");
  }

  if (canAccess !== null && canAccess === false) {
    navigate("/events/" + eventID);
  }

  return { event, loading, error, canAccess, t };
};
