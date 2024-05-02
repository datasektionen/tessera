import { Box, Card, CardContent, Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";

const BecomeAManagerPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems={"center"}
        spacing={5}
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Grid>
          <Card
            variant="soft"
            sx={{
              width: 250,
              cursor: "pointer",
              "&:hover": {
                boxShadow: "md",
                borderColor: "neutral.outlinedHoverBorder",
              },
            }}
          >
            <CardContent>
              <StyledText level="h1" color={PALLETTE.charcoal}>
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
              cursor: "pointer",
              "&:hover": {
                boxShadow: "md",
                borderColor: "neutral.outlinedHoverBorder",
              },
            }}
          >
            <CardContent>
              <StyledText level="h1" color={PALLETTE.charcoal}>
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
