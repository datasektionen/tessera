import React from "react";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import { Grid, Typography } from "@mui/joy";
import Title from "../../components/text/title";
import FoodPreferences from "../../components/food_preferences";
import UserInfo from "../../components/user/user_info";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingOverlay from "../../components/Loading";
import { useTranslation } from "react-i18next";

const ProfilePage: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  return (
    <TesseraWrapper>
      {loading && <LoadingOverlay />}
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
            <Title>{t("profile.title")}</Title>
            <UserInfo user={user!} />
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
