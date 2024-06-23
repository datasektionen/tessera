import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNetworkRequest } from "../../redux/features/manager/networkSlice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useNetworkDetails = (redirectOnFail: boolean = true) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { network, loading, error } = useSelector(
    (state: RootState) => state.network
  );

  useEffect(() => {
    if (error) {
      if (error !== "User does not belong to a network") {
        if (redirectOnFail) {
          setTimeout(() => {
            toast.error(error);
          }, 1000);

          navigate("/");
        }
      }
    }
  }, [error]);

  useEffect(() => {
    dispatch(getNetworkRequest());
  }, [dispatch]);

  return { network, loading, error };
};
