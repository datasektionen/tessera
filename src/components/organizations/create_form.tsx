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
import { createOrganizationRequest } from "../../redux/features/organizationSlice";
import { useTranslation } from "react-i18next";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../forms/form_labels";
import { canCreateOrg } from "../../utils/roles/can_create_org";

const CreateOrganizationForm: React.FC = () => {
  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizationEmail, setOrganizationEmail] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { user: currentUser } = useSelector((state: RootState) => state.user);

  const handleCreateOrganization = () => {
    // Create the organization
    dispatch(
      createOrganizationRequest({
        name: organizationName,
        email: organizationEmail,
      })
    );
  };

  const canCreate = canCreateOrg(currentUser!);

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
            value={organizationName}
            placeholder="Lit Club"
            disabled={!canCreate}
            onChange={(e) => setOrganizationName(e.target.value)}
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
            value={organizationEmail}
            placeholder="example@datasektionen.se"
            disabled={!canCreate}
            onChange={(e) => setOrganizationEmail(e.target.value)}
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
          onClick={handleCreateOrganization}
        >
          {t("create_team.create_team_button")}
        </Button>
      </FormControl>
    </Box>
  );
};

export default CreateOrganizationForm;
