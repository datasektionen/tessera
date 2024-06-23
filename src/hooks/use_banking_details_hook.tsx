import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEventDetails } from "./event/use_event_details_hook";
import { getBankingDetailsRequest } from "../redux/features/bankingDetailsSlice";
import { RootState } from "../store";

export const useBankingDetails = (eventID: number) => {
  const dispatch = useDispatch();

  const {
    eventDetail: { event },
  } = useEventDetails(eventID);

  useEffect(() => {
    const organizationID = event?.organization_id!;
    if (organizationID) {
      dispatch(
        getBankingDetailsRequest({
          organizationID: organizationID,
        })
      );
    }
  }, [dispatch, event]);

  const bankingDetails = useSelector(
    (state: RootState) => state.bankingDetails
  );

  return {
    bankingDetails: bankingDetails,
    event: event,
  };
};
