import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import PALLETTE from "../../theme/pallette";
import { IEvent, INetwork, IOrganization } from "../../types";
import StyledText from "../text/styled_text";
import Title from "../text/title";
import BorderBox from "../wrappers/border_box";
import { useEffect, useState } from "react";
import {
  deleteOrganizationRequest,
  getOrganizationEventsRequest,
  getOrganizationUsersRequest,
} from "../../redux/features/organizationSlice";
import LoadingOverlay from "../Loading";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Divider,
  Link,
  Stack,
  useTheme,
} from "@mui/joy";
import { getUserFullName, isTeamOwner } from "../../utils/user_utils";
import OrganizationUserView from "./organization_user_view";
import { removeUserSuccess } from "../../redux/sagas/organizationSaga";
import AddOrganizationUser from "./add_organization_user";
import OrganizationEventView from "./organization_event_view";
import { Trans, useTranslation } from "react-i18next";
import ConfirmModal from "../modal/confirm_modal";
import StyledButton from "../buttons/styled_button";
import { useNavigate } from "react-router-dom";
import EditOrganization from "./edit";
import InformationModal from "../modal/information";
import { useMediaQuery } from "@mui/material";

interface ViewOrganizationProps {
  organization: IOrganization;
  network: INetwork;
}

const ViewOrganization: React.FC<ViewOrganizationProps> = ({
  organization,
  network,
}) => {
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const { loading, organizationEvents } = useSelector(
    (state: RootState) => state.organization
  ) as {
    loading: boolean;
    organizationEvents: IEvent[];
  };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const reFetch = () => {
    dispatch(getOrganizationUsersRequest(organization.id));
  };

  useEffect(() => {
    dispatch(getOrganizationUsersRequest(organization.id));
    dispatch(getOrganizationEventsRequest(organization.id));
  }, [dispatch, removeUserSuccess, organization]);

  const handleDeleteOrganization = () => {
    // Delete the organization
    dispatch(deleteOrganizationRequest(organization.id));
  };

  const organizationUsers = network.organizations.find(
    (org) => org.id === organization.id
  )?.users;

  const isOwner = currentUser && isTeamOwner(currentUser);

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <BorderBox
      style={{
        marginTop: "16px",
        marginRight: "16px",
        width: isScreenSmall ? "90%" : "100%",
      }}
    >
      {loading && <LoadingOverlay />}
      <Title fontSize={32}>{organization.name}</Title>
      <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
        {t("common.created") + " "}{" "}
        {new Date(organization.created_at!).toLocaleDateString()}
      </StyledText>

      {/* Users */}
      <Title
        fontSize={22}
        style={{ marginTop: "16px" }}
        color={PALLETTE.charcoal}
      >
        {t("profile.your_teams.users")}
      </Title>

      {organizationUsers?.length === 0 ? (
        <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
          {t("profile.your_teams.no_users")}
        </StyledText>
      ) : (
        organizationUsers?.map((user) => {
          return (
            <OrganizationUserView
              user={user}
              organization={organization}
              canManage={isOwner!}
            />
          );
        })
      )}

      {/* Add new user */}
      {currentUser && isTeamOwner(currentUser) && (
        <AddOrganizationUser organization={organization} reFetch={reFetch} />
      )}

      <Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />
      <Box sx={{ marginTop: "16px" }}>
        <Title fontSize={22} color={PALLETTE.charcoal}>
          {t("profile.your_teams.manage_team_events")}
        </Title>

        <AccordionGroup>
          <Accordion
            variant="plain"
            expanded={showAllEvents}
            onChange={() => setShowAllEvents(!showAllEvents)}
          >
            <AccordionSummary>
              <StyledText
                level="body-md"
                fontSize={18}
                color={PALLETTE.charcoal_see_through}
                fontWeight={700}
              >
                {showAllEvents ? t("common.show_less") : t("common.show_all")}
              </StyledText>
            </AccordionSummary>
            <AccordionDetails>
              {organizationEvents?.length === 0 ? (
                <StyledText
                  level="body-md"
                  fontSize={18}
                  color={PALLETTE.charcoal}
                >
                  <Trans i18nKey="profile.your_teams.no_events">
                    There are no events in this team.
                    <Link href="/create-event">Create one</Link>.
                  </Trans>
                </StyledText>
              ) : (
                organizationEvents?.map((event) => {
                  return (
                    <OrganizationEventView
                      event={event}
                      organization={organization}
                    />
                  );
                })
              )}
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </Box>
      <Box style={{ textAlign: "right" }}>
        {/* Delete team box */}
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
          }}
          title={t("profile.your_teams.delete_team_confirmation_title")}
          actions={[
            <StyledButton
              size="lg"
              key="confirm-delete"
              onClick={() => {
                setShowDeleteModal(false);
                handleDeleteOrganization();
              }}
              bgColor={PALLETTE.offWhite}
              color={PALLETTE.charcoal}
            >
              {t("form.button_confirm")}
            </StyledButton>,
            <StyledButton
              size="lg"
              key="cancel-delete"
              onClick={() => {
                // Close the modal
                setShowDeleteModal(false);
              }}
              bgColor={PALLETTE.orange}
              color={PALLETTE.charcoal}
            >
              {t("form.button_cancel")}
            </StyledButton>,
          ]}
        >
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            {t("profile.your_teams.delete_team_confirmation")}
          </StyledText>
        </ConfirmModal>

        <InformationModal
          title="Edit team"
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
          }}
        >
          <EditOrganization organization={organization} />
        </InformationModal>

        <Stack spacing={2} direction={"row"}>
          <StyledButton
            size="sm"
            style={{ marginTop: "32px" }}
            onClick={() => {
              setEditModalOpen(true);
            }}
            color={PALLETTE.charcoal}
          >
            {t("profile.your_teams.edit_team")}
          </StyledButton>
          <StyledButton
            size="sm"
            style={{ marginTop: "32px" }}
            onClick={() => {
              setShowDeleteModal(true);
            }}
            bgColor={PALLETTE.red}
            color={PALLETTE.charcoal}
          >
            {t("profile.your_teams.delete_team")}
          </StyledButton>
        </Stack>
      </Box>
    </BorderBox>
  );
};

export default ViewOrganization;
