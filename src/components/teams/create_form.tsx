import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import StyledButton from "../buttons/styled_button";
import { useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { createTeamRequest } from "../../redux/features/teamSlice";
import { useTranslation } from "react-i18next";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../forms/form_labels";

const CreateTeamForm: React.FC = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [teamEmail, setTeamEmail] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { user: currentUser } = useSelector((state: RootState) => state.user);

  const handleCreateTeam = () => {
    // Create the team
    dispatch(
      createTeamRequest({
        name: teamName,
        email: teamEmail,
      })
    );
  };

  const canCreate = currentUser?.role?.name === "super_admin";

  return (
    <Box
      style={{
        borderColor: PALLETTE.cerise,
        borderWidth: "1px",
        borderStyle: "solid",
        padding: "16px",
        marginTop: "32px",
        backgroundColor: canCreate
          ? PALLETTE.offWhite
          : PALLETTE.charcoal_see_through, // Change when ready,
      }}
    >
      <FormControl>
        <FormLabel
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <StyledFormLabel>{t("create_team.add_team_title")}</StyledFormLabel>
          <Input
            value={teamName}
            placeholder="Lit Club"
            disabled={!canCreate}
            onChange={(e) => setTeamName(e.target.value)}
            style={{
              color: PALLETTE.charcoal,
            }}
          />
          <StyledFormLabelWithHelperText>
            {t("create_team.add_team_helperText")}
          </StyledFormLabelWithHelperText>
        </FormLabel>
        {/* Team email */}
        <FormLabel
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <StyledFormLabel>{t("create_team.add_team_email")}</StyledFormLabel>
          <Input
            value={teamEmail}
            placeholder="example@datasektionen.se"
            disabled={!canCreate}
            onChange={(e) => setTeamEmail(e.target.value)}
            style={{
              color: PALLETTE.charcoal,
            }}
          />
          <StyledFormLabelWithHelperText>
            {t("create_team.add_team_email_helperText")}
          </StyledFormLabelWithHelperText>
        </FormLabel>

        <Button
          variant="outlined"
          disabled={!canCreate} // Change when ready
          style={{
            marginTop: "16px",
            width: "200px",
            color: PALLETTE.cerise,
            borderColor: PALLETTE.cerise,
          }}
          onClick={handleCreateTeam}
        >
          {t("create_team.create_team_button")}
        </Button>
      </FormControl>
    </Box>
  );
};

export default CreateTeamForm;
