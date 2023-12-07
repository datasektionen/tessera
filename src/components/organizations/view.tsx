import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import PALLETTE from "../../theme/pallette";
import {
  IOrganization,
  IOrganizationUser,
  OrganizationUserRole,
} from "../../types";
import StyledText from "../text/styled_text";
import Title from "../text/title";
import BorderBox from "../wrappers/border_box";
import { useEffect } from "react";
import { getOrganizationUsersRequest } from "../../redux/features/organizationSlice";
import LoadingOverlay from "../Loading";
import { Divider, Grid, Input, Option, Select, Sheet } from "@mui/joy";
import { getUserFullName } from "../../utils/user_utils";
import OrganizationUserView from "./organization_user_view";
import { removeUserSuccess } from "../../redux/sagas/organizationSaga";
import AddOrganizationUser from "./add_organization_user";

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

  const reFetch = () => {
    dispatch(getOrganizationUsersRequest(organization.id));
  };

  useEffect(() => {
    dispatch(getOrganizationUsersRequest(organization.id));
  }, [dispatch, removeUserSuccess]);

  const isOwner = organizationUsers?.find(
    (user) =>
      user.username === currentUser?.username &&
      user.organization_role === OrganizationUserRole.OWNER
  );

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
          <OrganizationUserView
            user={user}
            organization={organization}
            canManage={isOwner !== undefined}
          />
        );
      })}
      {/* Add new user */}
      <AddOrganizationUser organization={organization} reFetch={reFetch} />
    </BorderBox>
  );
};

export default ViewOrganization;
