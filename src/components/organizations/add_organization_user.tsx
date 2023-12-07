import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Option,
  Select,
  Sheet,
  Stack,
} from "@mui/joy";
import { IOrganization, OrganizationUserRole } from "../../types";
import PALLETTE from "../../theme/pallette";
import { TitleTwoTone } from "@mui/icons-material";
import StyledText from "../text/styled_text";
import Title from "../text/title";
import { useState } from "react";
import StyledButton from "../buttons/styled_button";
import axios from "axios";
import { toast } from "react-toastify";

interface AddOrganizationUserProps {
  organization: IOrganization;
  reFetch: () => void;
}

const AddOrganizationUser: React.FC<AddOrganizationUserProps> = ({
  organization,
  reFetch,
}) => {
  const [username, setUsername] = useState<string>("");

  const handleAddUser = async () => {
    // Add the user to the organization
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/organizations/${organization.id}/users/${username}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("User added successfully!");
        setUsername("");
        reFetch();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <Sheet
      style={{
        marginTop: "16px",
        backgroundColor: PALLETTE.offWhite,
      }}
    >
      <Title fontSize={22}>Add User</Title>
      <FormControl>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "200px",
                borderColor: PALLETTE.cerise,
                backgroundColor: PALLETTE.offWhite,
              }}
              placeholder="Enter username"
            />
          </Box>
          <Box>
            <StyledButton
              color={PALLETTE.cerise}
              size="sm"
              style={{ width: "100px" }}
              onClick={async () => {
                await handleAddUser();
              }}
            >
              Submit
            </StyledButton>
          </Box>
        </Stack>
        <FormHelperText>
          <StyledText level="body-sm" fontSize={16} color={PALLETTE.charcoal}>
            Enter the username of the user you want to add to this organization.
            You can change their role later. <br /> Hint: Username is the same
            as kth-id.
          </StyledText>
        </FormHelperText>
      </FormControl>
    </Sheet>
  );
};

export default AddOrganizationUser;
