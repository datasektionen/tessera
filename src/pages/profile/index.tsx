import React from "react";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import { Grid, Typography } from "@mui/joy";
import Title from "../../components/text/title";
import FoodPreferences from "../../components/food_preferences";

const ProfilePage: React.FC = () => {
  return (
    <TesseraWrapper>
      <Typography level="h1" fontFamily="Josefin Sans">
        <Grid
          container
          spacing={2}
          columns={16}
          sx={{ flexGrow: 1 }}
          style={{
            marginLeft: "5%",
            marginRight: "5%",
          }}
        >
          <Grid xs={8}>
            <Title>Profile</Title>
          </Grid>
          <Grid xs={8}>
            <FoodPreferences />
          </Grid>
        </Grid>
      </Typography>
    </TesseraWrapper>
  );
};

export default ProfilePage;
