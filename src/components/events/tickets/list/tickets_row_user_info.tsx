import { Grid } from "@mui/joy";
import { IUser } from "../../../../types";
import InformationModal from "../../../modal/information";
import UserInfoText from "../../../text/user_info_text";
import StyledText from "../../../text/styled_text";
import { Cancel, CheckCircle } from "@mui/icons-material";
import PALLETTE from "../../../../theme/pallette";

interface TicketsRowUserInfoProps {
  user?: IUser;
}

const TicketsRowUserInfo: React.FC<TicketsRowUserInfoProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="flex-start"
      columns={12}
    >
      <Grid xs={6}>
        <UserInfoText
          label="Full name"
          value={`${user.first_name} ${user.last_name}`}
        />
        <UserInfoText
          label="Email"
          value={<a href={`mailto:${user.email}`}>{user.email}</a>}
        />
        <UserInfoText label="KTH ID" value={user.ug_kth_id} />
      </Grid>
      <Grid xs={6}>
        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          Gluten Intolerant{" "}
          {user.food_preferences?.gluten_intolerant ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          )}
        </StyledText>

        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          Halal{" "}
          {user.food_preferences?.halal ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          )}
        </StyledText>

        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          Kosher{" "}
          {user.food_preferences?.kosher ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          )}
        </StyledText>

        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          Lactose Intolerant{" "}
          {user.food_preferences?.lactose_intolerant ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          )}
        </StyledText>

        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          Nut Allergy{" "}
          {user.food_preferences?.nut_allergy ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          )}
        </StyledText>

        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          Shellfish Allergy{" "}
          {user.food_preferences?.shellfish_allergy ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          )}
        </StyledText>

        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          Vegan{" "}
          {user.food_preferences?.vegan ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          )}
        </StyledText>

        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          Vegetarian{" "}
          {user.food_preferences?.vegetarian ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          )}
        </StyledText>
        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          Prefers Meat{" "}
          {user.food_preferences?.prefer_meat ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          )}
        </StyledText>
        <UserInfoText
          label="Additional info"
          value={
            !!user.food_preferences?.additional ? (
              user.food_preferences?.additional
            ) : (
              <StyledText
                level="body-sm"
                color={PALLETTE.charcoal}
                fontWeight={400}
                fontSize={16}
              >
                No additional info
              </StyledText>
            )
          }
        />
      </Grid>
    </Grid>
  );
};

export default TicketsRowUserInfo;
