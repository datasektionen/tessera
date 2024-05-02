import { Box, Card, CardContent, CardCover, Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import Title from "../../components/text/title";
import FestivitiesSVG from "../../assets/undraw/undraw_festivities_tvvj.svg";
import JoinSVG from "../../assets/undraw/undraw_join_re_w1lh.svg";

const BecomeAManagerPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <Title style={{}}>{t("Become a Manager")}</Title>
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
          <Card
            variant="soft"
            sx={{
              width: 250,
              height: 300,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "md",
                borderColor: "neutral.outlinedHoverBorder",
                transform: "translateY(-10px)",
              },
            }}
          >
            <CardCover>
              <img src={JoinSVG} alt="Festivities" style={{}} />
            </CardCover>
            <CardCover
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
              }}
            />
            <CardContent sx={{ justifyContent: "flex-end" }}>
              <StyledText level="h1" color={PALLETTE.white}>
                Become an Organizer
              </StyledText>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card
            variant="soft"
            sx={{
              width: 250,
              height: 300,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "md",
                borderColor: "neutral.outlinedHoverBorder",
                transform: "translateY(-10px)",
              },
            }}
          >
            <CardCover>
              <img
                src={FestivitiesSVG}
                alt="Festivities"
                style={{ width: "100%" }}
              />
            </CardCover>
            <CardCover
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
              }}
            />
            <CardContent sx={{ justifyContent: "flex-end" }}>
              <StyledText level="h1" color={PALLETTE.white}>
                Become an Organizer
              </StyledText>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BecomeAManagerPage;
