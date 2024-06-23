import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import { ROUTES } from "../../routes/def";
import { Link } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { getCustomerEventRequest } from "../../redux/features/customerViewEvent";
import { resetPostSuccess } from "../../redux/features/ticketRequestSlice";

export const useEventEffects = (
  postSuccess: boolean,
  errorStatusCode: number | null,
  refID: string,
  secretToken: string | null,
  error?: string | null
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [displayPostSuccess, setDisplayPostSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (postSuccess) {
      setDisplayPostSuccess(true);
      dispatch(resetPostSuccess());
    }
  }, [dispatch, postSuccess]);

  useEffect(() => {
    if (displayPostSuccess) {
      toast.success(
        <StyledText color={PALLETTE.charcoal} level="body-sm" fontWeight={600}>
          Ticket request created! View it{" "}
          <Link href={ROUTES.PROFILE_TICKET_REQUESTS}>here</Link>
        </StyledText>
      );
    }
  }, [displayPostSuccess]);

  useEffect(() => {
    if (errorStatusCode === 404) {
      navigate("/404");
    } else if (errorStatusCode === 403) {
      setTimeout(() => {
        toast.error(error);
      }, 1000);
      navigate("/");
    } else if (errorStatusCode) {
      setTimeout(() => {
        toast.error(error);
      }, 1000);
      navigate("/");
    }
  }, [errorStatusCode, error]);

  useEffect(() => {
    if (!refID) {
      console.error("No event id found");
      return;
    }
    const promoCodes = JSON.parse(localStorage.getItem("promo_codes") || "[]");
    dispatch(
      getCustomerEventRequest({
        refID,
        secretToken: secretToken || "",
        countSiteVisit: true,
        promoCodes,
      })
    );
  }, [dispatch, refID, secretToken]);

  return { displayPostSuccess };
};
