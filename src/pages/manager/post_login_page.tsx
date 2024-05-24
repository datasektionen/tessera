import { Box, Card, CardContent, CardCover, Grid, Link } from "@mui/joy";
import { useTranslation } from "react-i18next";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import Title from "../../components/text/title";
import FestivitiesSVG from "../../assets/undraw/undraw_festivities_tvvj.svg";
import JoinSVG from "../../assets/undraw/undraw_join_re_w1lh.svg";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useNavigate } from "react-router-dom";
import { use } from "i18next";
import { generateRoute, ROUTES } from "../../routes/def";
import axios from "axios";
import { useEffect } from "react";
interface CardComponentProps {
  title: string;
  imgSrc: string;
  altText: string;
  onClick: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  imgSrc,
  altText,
  onClick,
}) => (
  <Card
    onClick={onClick}
    variant="outlined"
    sx={{
      margin: "0 auto",
      width: 300,
      height: 60,
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.3)",
      "&:hover": {
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        borderColor: "neutral.outlinedHoverBorder",
        transform: "translateY(-10px)",
        boxShadow: "0px 8px 5px rgba(0, 0, 0, 0.3)",
      },
    }}
  >
    <CardContent sx={{ justifyContent: "center", textAlign: "center" }}>
      <StyledText level="h1" color={PALLETTE.charcoal} fontSize={30}>
        {title}
      </StyledText>
    </CardContent>
  </Card>
);

const PostLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function updateShowedPostLogin() {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/user/showed-post-login-screen`,
        {},
        { withCredentials: true }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    updateShowedPostLogin();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Title
          style={{
            marginTop: "64px",
          }}
          color={PALLETTE.cerise}
        >
          {t("become_a_manager.welcome")}
        </Title>
        <StyledText level="h2" color={PALLETTE.charcoal} fontSize={24}>
          {t("become_a_manager.proceed")}
        </StyledText>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: 10,
        }}
      >
        <CardComponent
          title={t("become_a_manager.continue_as_manager")}
          imgSrc={FestivitiesSVG}
          altText="Festivities"
          onClick={() => {
            navigate(generateRoute(ROUTES.BECOME_A_MANAGER, {}));
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 10,
          textAlign: "center",
        }}
      >
        <StyledText
          level="h2"
          color={PALLETTE.charcoal_see_through}
          fontSize={20}
          sx={{
            cursor: "pointer",
          }}
        >
          <Link
            href="/"
            sx={{
              color: PALLETTE.charcoal_see_through,
              textDecoration: "none",
              "&:hover": {
                color: PALLETTE.charcoal,
              },
            }}
          >
            {t("become_a_manager.skip")} <SkipNextIcon />
          </Link>
        </StyledText>
      </Box>
    </Box>
  );
};

export default PostLoginPage;
