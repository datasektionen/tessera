import { Button, Divider, Grid, Stack } from "@mui/joy";
import Title from "../../components/text/title";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import StandardGrid from "../../components/wrappers/standard_grid";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationsRequest } from "../../redux/features/organizationSlice";
import LoadingOverlay from "../../components/Loading";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import { Link, unstable_HistoryRouter } from "react-router-dom";
import StyledButton from "../../components/buttons/styled_button";
import { ROUTES } from "../../routes/def";
import ViewOrganization from "../../components/organizations/view";

const ProfileOrgnizationsPage = () => {
  const { organizations, loading, error } = useSelector(
    (state: RootState) => state.organization
  );

  const dispatch: AppDispatch = useDispatch();

  const [selected, setSelected] = React.useState<number | null>(null);

  useEffect(() => {
    dispatch(getOrganizationsRequest());
  }, [dispatch]);

  return (
    <TesseraWrapper>
      {loading && <LoadingOverlay />}
      <StandardGrid>
        <Grid xs={8}>
          <Title>Your Teams</Title>
          <StyledText level="body-md" color={PALLETTE.charcoal} fontSize={18}>
            Here you can see all the teams you are a part of. Click on a team to
            see more details. You can create a new team{" "}
            <Link to={ROUTES.CREATE_ORGANIZATION}>here</Link>.
          </StyledText>

          <Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />

          {organizations?.length === 0 ? (
            <StyledText level="body-md" color={PALLETTE.charcoal} fontSize={18}>
              You are not a part of any team. You can create one{" "}
              <Link to={ROUTES.CREATE_ORGANIZATION}>here</Link>.
            </StyledText>
          ) : (
            <Stack spacing={2}>
              {organizations!.map((org) => {
                return (
                  <>
                    <StyledButton
                      onClick={() => {
                        setSelected(org.id);
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
                  </>
                );
              })}
            </Stack>
          )}
        </Grid>
        <Grid xs={8}>
          {selected && (
            <ViewOrganization
              organization={organizations!.find((org) => org.id === selected)!}
            />
          )}
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default ProfileOrgnizationsPage;
