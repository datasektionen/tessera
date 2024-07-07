import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNetworkRequest } from "../../redux/features/manager/networkSlice";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { INetwork } from "../../types";
import { setThemeColors } from "../../redux/features/managerThemeSlice";
import { isColorDark } from "../../utils/manager/color";
import PALLETTE from "../../theme/pallette";

export const updateNetworkColors = (
  network: INetwork | null | undefined,
  dispatch: AppDispatch
) => {
  if (network?.settings) {
    const main_color = network.settings.main_color;
    const accent_color = network.settings.accent_color;
    const text_color = isColorDark(main_color)
      ? PALLETTE.white
      : PALLETTE.charcoal;

    dispatch(
      setThemeColors({
        main_color,
        accent_color,
        text_color,
      })
    );
  }
};

export const useNetworkDetails = (redirectOnFail: boolean = true) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shouldFetch, setShouldFetch] = useState(true);
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
  }, [error, redirectOnFail, navigate]);

  useEffect(() => {
    if (shouldFetch && !network && !loading) {
      dispatch(getNetworkRequest());
      setShouldFetch(false);
    }
  }, [dispatch, shouldFetch, network, loading]);

  const refetch = () => {
    setShouldFetch(true);
    updateNetworkColors(network, dispatch);
  };

  if (network) {
    updateNetworkColors(network, dispatch);
  }

  return { network, loading, error, refetch };
};
