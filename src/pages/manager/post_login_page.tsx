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
    variant="soft"
    sx={{
      width: 250,
      height: 300,
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
      "&:hover": {
        borderColor: "neutral.outlinedHoverBorder",
        transform: "translateY(-10px)",
      },
    }}
  >
    <CardCover>
      <img src={imgSrc} alt={altText} style={{ width: "100%" }} />
    </CardCover>
    <CardCover
      sx={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
      }}
    />
    <CardContent sx={{ justifyContent: "flex-end" }}>
      <StyledText level="h1" color={PALLETTE.white} fontSize={30}>
        {title}
      </StyledText>
    </CardContent>
  </Card>
);

const PostLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  async function updateShowedPostLogin() {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/showed-post-login-screen`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
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
      <Grid
        container
        justifyContent="center"
        alignItems={"center"}
        spacing={5}
        sx={{
          width: "100%",
          mt: 10,
        }}
      >
        <Grid>
          <CardComponent
            title={t("become_a_manager.customer")}
            imgSrc={JoinSVG}
            altText="Join"
            onClick={() => {
              navigate("/");
            }}
          />
        </Grid>
        <Grid>
          <CardComponent
            title={t("become_a_manager.manager")}
            imgSrc={FestivitiesSVG}
            altText="Festivities"
            onClick={() => {
              navigate(generateRoute(ROUTES.BECOME_A_MANAGER, {}));
            }}
          />
        </Grid>
      </Grid>
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
            Skip <SkipNextIcon />
          </Link>
        </StyledText>
      </Box>
    </Box>
  );
};

export default PostLoginPage;
