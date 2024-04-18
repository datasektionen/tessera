import { Box, Grid } from "@mui/joy";
import StyledText from "../../components/text/styled_text";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import PALLETTE from "../../theme/pallette";
import Title from "../../components/text/title";
import StandardGrid from "../../components/wrappers/standard_grid";
import CreateTeamForm from "../../components/teams/create_form";
import StyledButton from "../../components/buttons/styled_button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreateTeamPage: React.FC = () => {
  const nagivate = useNavigate();
  const { t } = useTranslation();

  return (
    <TesseraWrapper>
      <StandardGrid>
        <Grid xs={8}>
          <Title>{t("create_team.title")}</Title>
          <StyledText level="body-md" color={PALLETTE.charcoal} fontSize={22}>
            {t("create_team.what_is_a_team")}
          </StyledText>
          <StyledText level="body-md" color={PALLETTE.charcoal} fontSize={18}>
            {t("create_team.description")}{" "}
            <strong>{t("create_team.teams_created_by_contacting_us")}</strong>
          </StyledText>
          <Box mt={2}>
            <StyledButton
              size="lg"
              onClick={() => {
                nagivate("/profile/teams");
              }}
              color={PALLETTE.charcoal}
              bgColor={PALLETTE.offWhite}
            >
              {t("create_team.your_teams_text")}
            </StyledButton>
          </Box>
        </Grid>
        <Grid xs={8}>
          <CreateTeamForm />
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default CreateTeamPage;
