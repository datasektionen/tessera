import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useEffect } from "react";
import { logoutRequest } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import PALLETTE from "../../theme/pallette";
import LoadingOverlay from "../Loading";
import { Typography } from "@mui/joy";
import StyledButton from "../buttons/styled_button";

const Logout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("promo_codes");
    dispatch(logoutRequest());
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: PALLETTE.offWhite,
      }}
    >
      <Typography level="h1" color="primary" fontSize={72}>
        Tessera
      </Typography>
      <Typography level="h4" color="neutral">
        You have been logged out.
      </Typography>

      <Typography level="h4" color="neutral" fontSize={14} mt={3}>
        <StyledButton
          size="lg"
          onClick={() => {
            // Reload the page
            dispatch(logoutRequest());
          }}
        >
          Login again
        </StyledButton>
      </Typography>
    </div>
  );
};

export default Logout;
