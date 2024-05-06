import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNetworkRequest } from "../../redux/features/manager/networkSlice";
import { RootState } from "../../store";

export const useNetworkDetails = () => {
  const dispatch = useDispatch();
  const { network, loading, error } = useSelector(
    (state: RootState) => state.network
  );

  useEffect(() => {
    dispatch(getNetworkRequest());
  }, [dispatch]);

  return { network, loading, error };
};
