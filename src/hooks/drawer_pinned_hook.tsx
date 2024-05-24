import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setPinned } from "../redux/features/drawerPinnedSlice";

export const DRAWER_WIDTH = 230;
const usePinnedDrawer = (initialMargin: string) => {
  const dispatch: AppDispatch = useDispatch();
  const isPinned = useSelector(
    (state: RootState) => state.drawerPinned.isPinned
  );

  const [marginLeft, setMarginLeft] = useState(initialMargin);

  const handlePinned = useCallback(
    (pinned: boolean) => {
      dispatch(setPinned(pinned));
      if (pinned) {
        setMarginLeft(`${DRAWER_WIDTH + 16}px`);
      } else {
        setMarginLeft(initialMargin);
      }
    },
    [initialMargin, dispatch]
  );

  // For reloads
  useEffect(() => {
    if (isPinned) {
      setMarginLeft(`${DRAWER_WIDTH + 16}px`);
    } else {
      setMarginLeft(initialMargin);
    }
  }, [isPinned, initialMargin]);

  return { marginLeft, isPinned, handlePinned };
};

export default usePinnedDrawer;
