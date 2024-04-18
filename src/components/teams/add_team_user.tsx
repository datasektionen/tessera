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
import { ITeam, TeamUserRole } from "../../types";
import PALLETTE from "../../theme/pallette";
import { TitleTwoTone } from "@mui/icons-material";
import StyledText from "../text/styled_text";
import Title from "../text/title";
import { useState } from "react";
import StyledButton from "../buttons/styled_button";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface AddTeamUserProps {
  team: ITeam;
  reFetch: () => void;
}

const AddTeamUser: React.FC<AddTeamUserProps> = ({ team, reFetch }) => {
  const [username, setUsername] = useState<string>("");
  const { t } = useTranslation();
  const handleAddUser = async () => {
    // Add the user to the team
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/teams/${team.id}/users/${username}`,
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
      <Title fontSize={22} color={PALLETTE.charcoal}>
        {t("profile.your_teams.add_user")}
      </Title>
      <FormControl>
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "350px",
          }}
        >
          <Grid xs={12} md={8}>
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
          </Grid>
          <Grid xs={12} md={4}>
            <StyledButton
              color={PALLETTE.cerise_dark}
              size="sm"
              style={{ width: "100px" }}
              onClick={async () => {
                await handleAddUser();
              }}
            >
              {t("form.button_submit")}
            </StyledButton>
          </Grid>
        </Grid>
        <FormHelperText>
          <StyledText level="body-sm" fontSize={16} color={PALLETTE.charcoal}>
            {t("profile.your_teams.add_user_helperText")}
          </StyledText>
        </FormHelperText>
      </FormControl>
    </Sheet>
  );
};

export default AddTeamUser;
