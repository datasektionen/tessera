import PALLETTE from "../../theme/pallette";

export const ScrollConfig = {
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: PALLETTE.offWhite,
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
};
