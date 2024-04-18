import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import PALLETTE from "../../theme/pallette";
import { IEvent, ITeam, ITeamUser, TeamUserRole } from "../../types";
import StyledText from "../text/styled_text";
import Title from "../text/title";
import BorderBox from "../wrappers/border_box";
import { useEffect, useState } from "react";
import {
  deleteTeamRequest,
  getMyTeamsRequest,
  getTeamEventsRequest,
  getTeamUsersRequest,
} from "../../redux/features/teamSlice";
import LoadingOverlay from "../Loading";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Input,
  Link,
  Option,
  Select,
  Sheet,
  Stack,
  useTheme,
} from "@mui/joy";
import { getUserFullName } from "../../utils/user_utils";
import TeamUserView from "./team_user_view";
import { removeUserSuccess } from "../../redux/sagas/teamSaga";
import AddTeamUser from "./add_team_user";
import TeamEventView from "./team_event_view";
import { Trans, useTranslation } from "react-i18next";
import ConfirmModal from "../modal/confirm_modal";
import StyledButton from "../buttons/styled_button";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditTeam from "./edit";
import InformationModal from "../modal/information";
import { useMediaQuery } from "@mui/material";

interface ViewTeamProps {
  team: ITeam;
}

const ViewTeam: React.FC<ViewTeamProps> = ({ team }) => {
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const { teamUsers, loading, teamEvents } = useSelector(
    (state: RootState) => state.team
  ) as {
    teamUsers: ITeamUser[];
    loading: boolean;
    teamEvents: IEvent[];
  };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const reFetch = () => {
    dispatch(getTeamUsersRequest(team.id));
  };

  useEffect(() => {
    dispatch(getTeamUsersRequest(team.id));
    dispatch(getTeamEventsRequest(team.id));
  }, [dispatch, removeUserSuccess, team]);

  const handleDeleteTeam = () => {
    // Delete the team
    dispatch(deleteTeamRequest(team.id));
  };

  const isOwner = teamUsers?.find(
    (user) =>
      user.username === currentUser?.username &&
      user.team_role === TeamUserRole.OWNER
  );

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
      <Title fontSize={32}>{team.name}</Title>
      <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
        {t("common.created") + " "}{" "}
        {new Date(team.created_at!).toLocaleDateString()}
      </StyledText>

      {/* Users */}
      <Title
        fontSize={22}
        style={{ marginTop: "16px" }}
        color={PALLETTE.charcoal}
      >
        {t("profile.your_teams.users")}
      </Title>
      <AccordionGroup>
        <Accordion
          variant="plain"
          expanded={showAllUsers}
          onChange={() => setShowAllUsers(!showAllUsers)}
        >
          <AccordionSummary>
            <StyledText
              level="body-md"
              fontSize={18}
              color={PALLETTE.charcoal_see_through}
              fontWeight={700}
            >
              {showAllUsers ? t("common.show_less") : t("common.show_all")}
            </StyledText>
          </AccordionSummary>
          <AccordionDetails>
            {teamUsers?.length === 0 ? (
              <StyledText
                level="body-md"
                fontSize={18}
                color={PALLETTE.charcoal}
              >
                {t("profile.your_teams.no_users")}
              </StyledText>
            ) : (
              teamUsers?.map((user) => {
                return (
                  <TeamUserView
                    user={user}
                    team={team}
                    canManage={isOwner !== undefined}
                  />
                );
              })
            )}
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
      {/* Add new user */}
      <AddTeamUser team={team} reFetch={reFetch} />

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
              {teamEvents?.length === 0 ? (
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
                teamEvents?.map((event) => {
                  return <TeamEventView event={event} team={team} />;
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
                handleDeleteTeam();
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
          <EditTeam team={team} />
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

export default ViewTeam;
