import { Box, Grid } from "@mui/joy";
import StyledText from "../../components/text/styled_text";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import PALLETTE from "../../theme/pallette";
import Title from "../../components/text/title";
import StandardGrid from "../../components/wrappers/standard_grid";
import CreateOrganizationForm from "../../components/organizations/create_form";
import StyledButton from "../../components/buttons/styled_button";
import { useNavigate } from "react-router-dom";

const CreateOrganizationPage: React.FC = () => {
  const nagivate = useNavigate();
  return (
    <TesseraWrapper>
      <StandardGrid>
        <Grid xs={8}>
          <Title>Create Team</Title>
          <StyledText level="body-md" color={PALLETTE.charcoal} fontSize={22}>
            What is a Team?
          </StyledText>
          <StyledText level="body-md" color={PALLETTE.charcoal} fontSize={18}>
            Here you can create a team. Teams are used to organize events and
            manage users. It allows the managers of the team to create events,
            manage ticket sales and plan the event more efficiently. You can
            ginvite other users to join your team andive them different
            permissions. You are also not limited to one team, you can create as
            many as you want, and join as many as you want. You can also leave
            teams at any time. Without being a part of a team you cannot create
            events. So go ahead and create a team!
          </StyledText>
          <Box mt={2}>
            <StyledButton
              size="lg"
              onClick={() => {
                nagivate("/profile/organizations");
              }}
              color={PALLETTE.charcoal}
              bgColor={PALLETTE.offWhite}
            >
              Your teams
            </StyledButton>
          </Box>
        </Grid>
        <Grid xs={8}>
          <CreateOrganizationForm />
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default CreateOrganizationPage;
