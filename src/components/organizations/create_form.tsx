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
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { createOrganizationRequest } from "../../redux/features/organizationSlice";

const CreateOrganizationForm: React.FC = () => {
  const [organizationName, setOrganizationName] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const handleCreateOrganization = () => {
    // Create the organization
    dispatch(
      createOrganizationRequest({
        name: organizationName,
      })
    );
  };

  return (
    <>
      <Box
        style={{
          borderColor: PALLETTE.cerise,
          borderWidth: "1px",
          borderStyle: "solid",
          padding: "16px",
          marginTop: "32px",
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
            <Typography
              level="body-sm"
              fontFamily={"Josefin sans"}
              fontWeight={700}
              style={{
                color: PALLETTE.charcoal,
              }}
            >
              Team Name
            </Typography>
            <Input
              value={organizationName}
              placeholder="Lit Club"
              onChange={(e) => setOrganizationName(e.target.value)}
              style={{
                color: PALLETTE.charcoal,
              }}
            />
            <FormHelperText>
              This will be the name of your team. You will automatically be the
              owner of this team.
            </FormHelperText>
          </FormLabel>
          <Button
            variant="outlined"
            style={{
              marginTop: "16px",
              width: "200px",
              color: PALLETTE.cerise,
              borderColor: PALLETTE.cerise,
            }}
            onClick={handleCreateOrganization}
          >
            Create Team
          </Button>
        </FormControl>
      </Box>
    </>
  );
};

export default CreateOrganizationForm;
