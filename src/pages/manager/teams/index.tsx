import { useEffect, useState } from "react";
import Title from "../../../components/text/title";
import DrawerBoxWrapper from "../../../components/wrappers/manager_wrapper";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import { getNetworkRequest } from "../../../redux/features/manager/networkSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNetworkDetails } from "../../../hooks/manager/network_details_hook";
import { AppDispatch } from "../../../store";
import StandardGrid from "../../../components/wrappers/standard_grid";
import { Grid } from "@mui/joy";
import StyledText from "../../../components/text/styled_text";
import PALLETTE from "../../../theme/pallette";
import StyledButton from "../../../components/buttons/styled_button";
import ViewOrganization from "../../../components/organizations/view";
import LoadingOverlay from "../../../components/Loading";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/def";
import TitleWithAddIcon from "../../../components/icons/title_with_add_icon";

const ManagerTeamsPage: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { network, loading, error } = useNetworkDetails();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const teams = network?.organizations;

  const handleSelect = (id: number) => {
    setSelected(id);
    navigate(ROUTES.MANAGER_TEAMS + `?organization_id=${id}`, {
      replace: true,
    });
  };

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper showManagerDashboard={true}>
        {error && <div>{error}</div>}
        <TitleWithAddIcon
          title={t("manager.teams.title", {
            name: network?.name ?? "Unknowns",
          })}
          route={ROUTES.CREATE_ORGANIZATION}
        />

        <Grid
          container
          spacing={2}
          columns={16}
          sx={{
            mr: 4,
            mt: 2,
          }}
        >
          <Grid xs={16} lg={4}>
            {teams?.length === 0 ? (
              <StyledText
                level="body-md"
                color={PALLETTE.charcoal}
                fontSize={18}
              >
                {t("profile.your_teams.not_part_of_any_teams")}
              </StyledText>
            ) : (
              <Grid container spacing={2} flexDirection="row">
                {teams?.map((org) => {
                  return (
                    <Grid>
                      <StyledButton
                        onClick={() => {
                          handleSelect(org.id);
                        }}
                        color={PALLETTE.cerise}
                        size="md"
                        style={{
                          width: "200px",
                          backgroundColor:
                            selected === org.id
                              ? PALLETTE.cerise
                              : PALLETTE.offWhite,
                        }}
                      >
                        <StyledText
                          level="body-md"
                          fontWeight={700}
                          color={PALLETTE.charcoal}
                          fontSize={18}
                        >
                          {org.name}
                        </StyledText>
                      </StyledButton>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Grid>
          <Grid xs={16} lg={12}>
            {selected && teams && (
              <ViewOrganization
                organization={teams?.find((t) => t.id === selected)!}
                network={network!}
              />
            )}
          </Grid>
        </Grid>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default ManagerTeamsPage;
