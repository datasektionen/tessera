import { Divider, Grid, Option, Select, Sheet, Stack } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import StyledText from "../text/styled_text";
import {
  IOrganization,
  IOrganizationUser,
  IUser,
  OrganizationUserRole,
} from "../../types";
import { getUserFullName } from "../../utils/user_utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import React, { useCallback, useEffect, useState } from "react";
import LoadingOverlay from "../Loading";
import { toast } from "react-toastify";
import axios from "axios";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { makeStyles } from "@mui/material";
import { removeUserRequest } from "../../redux/sagas/organizationSaga";

interface OrganizationUserViewProps {
  organization: IOrganization;
  user: IOrganizationUser;
  canManage: boolean;
}

const OrganizationUserView: React.FC<OrganizationUserViewProps> = ({
  user,
  organization,
  canManage,
}) => {
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState<OrganizationUserRole | null>(
    user.organization_role as OrganizationUserRole
  );
  const [loading, setLoading] = useState(false);

  const handleRoleChange = useCallback(
    async (event: any, newValue: OrganizationUserRole | null) => {
      if (newValue !== null) {
        setLoading(true);
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/organizations/${organization.id}/users/${user.username}`,
            { role: newValue },
            {
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            setSelectedRole(newValue);
            toast.success("User role changed successfully!");
          } else {
            toast.error("Something went wrong!");
          }
        } catch (error: any) {
          toast.error(error.response.data.error);
        } finally {
          setLoading(false);
        }
      }
    },
    [organization.id, user.username]
  );

  const handleRemove = useCallback(() => {
    dispatch(removeUserRequest(organization.id, user.username));
  }, [dispatch, organization.id, user.username]);

  const isMe: boolean = getUserFullName(currentUser!) === getUserFullName(user);

  return (
    <Sheet
      style={{
        backgroundColor: PALLETTE.offWhite,
      }}
    >
      {loading && <LoadingOverlay />}
      <Grid container spacing={2} columns={16}>
        <Grid xs={4}>
          <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
            {isMe ? (
              <span style={{ color: PALLETTE.cerise }}>You</span>
            ) : (
              <span>{getUserFullName(user)}</span>
            )}
          </StyledText>
          <StyledText level="body-sm" fontSize={16} color={PALLETTE.charcoal}>
            {user.username}
          </StyledText>
        </Grid>
        <Grid xs={6} justifyContent="flex-end" flexDirection="row">
          <StyledText
            level="body-sm"
            fontSize={18}
            fontWeight={700}
            color={PALLETTE.charcoal}
          >
            {user.organization_role}
          </StyledText>
          <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
            {user.email}
          </StyledText>
        </Grid>
        <Grid
          container
          xs={6}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          {canManage && !isMe && (
            <>
              <Select
                value={selectedRole}
                onChange={handleRoleChange}
                style={{
                  width: "125px",
                  borderColor: PALLETTE.cerise,
                  backgroundColor: PALLETTE.offWhite,
                }}
              >
                {Object.values(OrganizationUserRole).map((role) => {
                  return (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  );
                })}
              </Select>
              {/* Remove icon */}
              <RemoveCircleOutlineIcon
                style={{
                  color: PALLETTE.red,
                  marginLeft: "16px",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  await handleRemove();
                }}
              />
            </>
          )}
        </Grid>
      </Grid>
      <Divider />
    </Sheet>
  );
};

export default OrganizationUserView;
