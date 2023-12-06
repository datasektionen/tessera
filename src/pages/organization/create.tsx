import { Grid } from "@mui/joy";
import StyledText from "../../components/text/styled_text";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import PALLETTE from "../../theme/pallette";
import Title from "../../components/text/title";
import StandardGrid from "../../components/wrappers/standard_grid";
import CreateOrganizationForm from "../../components/organizations/create_form";

const CreateOrganizationPage: React.FC = () => {
    
  return (
    <TesseraWrapper>
      <StandardGrid>
        <Grid xs={8}>
          <Title>Create Organization</Title>
          <StyledText level="body-md" color={PALLETTE.charcoal} fontSize={22}>
            What is an organization?
          </StyledText>
          <StyledText level="body-md" color={PALLETTE.charcoal} fontSize={18}>
            Here you can create an organization. Organizations are used to
            organize events and manage users. It allows the managers of the
            organization to create events, manage ticket sales and plan the
            event more efficiently. You can invite other users to join your
            organization and give them different permissions. You are also not
            limited to one organization, you can create as many as you want, and
            join as many as you want.
          </StyledText>
        </Grid>
        <Grid xs={8}>
          <CreateOrganizationForm />
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default CreateOrganizationPage;
