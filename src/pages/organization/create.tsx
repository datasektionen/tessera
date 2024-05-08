import { Box, Grid } from "@mui/joy";
import StyledText from "../../components/text/styled_text";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import PALLETTE from "../../theme/pallette";
import Title from "../../components/text/title";
import StandardGrid from "../../components/wrappers/standard_grid";
import CreateOrganizationForm from "../../components/organizations/create_form";
import StyledButton from "../../components/buttons/styled_button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MUITesseraWrapper from "../../components/wrappers/page_wrapper_mui";
import DrawerBoxWrapper from "../../components/wrappers/manager_wrapper";
import { useFeatureLimitAccess } from "../../hooks/manager/required_feature_access_hook";
import { useNetworkDetails } from "../../hooks/manager/network_details_hook";
import { ROUTES } from "../../routes/def";

const CreateOrganizationPage: React.FC = () => {
  const { network, loading } = useNetworkDetails();

  const nagivate = useNavigate();
  const { t } = useTranslation();

  const { canUseFeature } = useFeatureLimitAccess(
    "max_teams_per_network",
    network?.id!.toString()
  );

  console.log(canUseFeature);

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper showManagerDashboard={true}>
        <StandardGrid
          spacing={6}
          overrideStyle={{
            marginLeft: 0,
          }}
        >
          <Grid xs={8}>
            <Title>{t("create_team.title")}</Title>
            <StyledText level="body-md" color={PALLETTE.charcoal} fontSize={22}>
              {t("create_team.what_is_a_team")}
            </StyledText>
            <StyledText level="body-md" color={PALLETTE.charcoal} fontSize={18}>
              {t("create_team.description")}
            </StyledText>
            {!canUseFeature && (
              <StyledText
                level="body-md"
                color={PALLETTE.orange}
                fontSize={18}
                fontWeight={700}
              >
                {t("features.limit_description", {
                  feature: "max_teams_per_network",
                })}
              </StyledText>
            )}
            <Box mt={2}>
              <StyledButton
                size="lg"
                onClick={() => {
                  nagivate(ROUTES.MANAGER_TEAMS);
                }}
                color={PALLETTE.charcoal}
                bgColor={PALLETTE.offWhite}
              >
                {t("create_team.your_teams_text")}
              </StyledButton>
            </Box>
          </Grid>
          <Grid xs={8}>
            <CreateOrganizationForm canCreate={canUseFeature === true} />
          </Grid>
        </StandardGrid>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default CreateOrganizationPage;
