import { Box } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import StandardToastContainer from "../../../wrappers/toast_container";
import Footer from "../../../wrappers/footer";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import FreeRegisterForm from "./free_register_form";

const GetStartedFreePlanEnrollment: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box sx={{}}>
      <StandardToastContainer />
      <Box
        sx={{
          mt: 10,
          textAlign: "center",
        }}
      >
        <StyledText level="h1" color={PALLETTE.cerise_dark} fontSize={48}>
          Free Plan
        </StyledText>
        <StyledText
          level="body-md"
          color={PALLETTE.offBlack}
          fontSize={20}
          sx={{
            textWrap: "balance",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Great to have you on board! Please fill out the form below to become
          and event manager.
        </StyledText>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <FreeRegisterForm />
      </Box>
      <Footer />
    </Box>
  );
};

export default GetStartedFreePlanEnrollment;