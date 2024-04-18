import { useState, useEffect } from "react";
import axios from "axios";
import { getEventSendOuts } from "../redux/sagas/axios_calls/send_outs/get_event_send_outs";
import { ISendOut } from "../types";
import { toast } from "react-toastify";

export const useEventSendOuts = (event_id: string) => {
  const [sendOuts, setSendOuts] = useState<ISendOut[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getEventSendOuts(event_id).then(
      (sendOuts) => {
        setSendOuts(sendOuts);
        setLoading(false);
      },
      (error) => {
        toast.error("Failed to fetch send outs");
        setError(error);
        setLoading(false);
      }
    );
  }, [event_id]);

  return { sendOuts, loading, error };
};
