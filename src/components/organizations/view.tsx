import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import PALLETTE from "../../theme/pallette";
import { IOrganization, IOrganizationUser } from "../../types";
import StyledText from "../text/styled_text";
import Title from "../text/title";
import BorderBox from "../wrappers/border_box";
import { useEffect } from "react";
import { getOrganizationUsersRequest } from "../../redux/features/organizationSlice";
import LoadingOverlay from "../Loading";
import { Divider, Grid, Sheet } from "@mui/joy";
import { getUserFullName } from "../../utils/user_utils";

interface ViewOrganizationProps {
  organization: IOrganization;
}

const ViewOrganization: React.FC<ViewOrganizationProps> = ({
  organization,
}) => {
  const { user: currentUser } = useSelector((state: RootState) => state.user);

  const { organizationUsers, loading } = useSelector(
    (state: RootState) => state.organization
  ) as {
    organizationUsers: IOrganizationUser[];
    loading: boolean;
  };
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganizationUsersRequest(organization.id));
  }, [dispatch]);

  console.log(organizationUsers);

  return (
    <BorderBox style={{ marginTop: "16px" }}>
      {loading && <LoadingOverlay />}
      <Title fontSize={32}>{organization.name}</Title>
      <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
        Created {new Date(organization.created_at!).toLocaleDateString()}
      </StyledText>

      {/* Users */}
      <Title fontSize={22} style={{ marginTop: "16px" }}>
        Users
      </Title>
      {organizationUsers?.map((user) => {
        return (
          <Sheet
            style={{
              backgroundColor: PALLETTE.offWhite,
            }}
          >
            <Grid container spacing={2} columns={16}>
              <Grid xs={8}>
                <StyledText
                  level="body-sm"
                  fontSize={18}
                  color={PALLETTE.charcoal}
                >
                  {getUserFullName(currentUser!) === getUserFullName(user) ? (
                    <span style={{ color: PALLETTE.cerise }}>You</span>
                  ) : (
                    <span>{getUserFullName(user)}</span>
                  )}
                </StyledText>
              </Grid>
              <Grid xs={8} justifyContent="flex-end" flexDirection="row">
                <StyledText
                  level="body-sm"
                  fontSize={18}
                  fontWeight={700}
                  color={PALLETTE.charcoal}
                >
                  {user.organization_role}
                </StyledText>
                <StyledText
                  level="body-sm"
                  fontSize={18}
                  color={PALLETTE.charcoal}
                >
                  {user.email}
                </StyledText>
              </Grid>
            </Grid>
            <Divider />
          </Sheet>
        );
      })}
    </BorderBox>
  );
};

export default ViewOrganization;
