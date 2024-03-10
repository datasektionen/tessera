import { Box, Grid, Link, Stack, useTheme } from "@mui/joy";
import React from "react";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import ProfilePicture from "../../assets/images/profile_picture.jpg";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn"; // import LinkedIn icon'
import GithubIcon from "@mui/icons-material/GitHub"; // import Github icon'
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

const ContactDetails = () => {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  return (
    <Grid
      container
      direction={isScreenSmall ? "column" : "row"}
      justifyContent="center"
      alignItems="center"
      columns={12}
      width="100%"
      spacing={isScreenSmall ? 2 : 10}
      my={10}
    >
      <Grid
        sm={12}
        md={6}
        style={{
          textAlign: isScreenSmall ? "center" : "right",
        }}
      >
        <Box>
          <img
            src={ProfilePicture}
            alt="Profile Picture"
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              border: `10px solid ${PALLETTE.cerise_dark}`,
            }}
          />
        </Box>
      </Grid>
      <Grid
        sm={12}
        md={6}
        style={{
          textAlign: isScreenSmall ? "center" : "left",
        }}
      >
        <StyledText
          level="body1"
          color={PALLETTE.cerise_dark}
          fontSize={32}
          sx={{
            mb: 1,
          }}
        >
          Lucas Dow
        </StyledText>
        <StyledText
          level="body2"
          color={PALLETTE.charcoal}
          style={{
            fontStyle: "italic", // Correct property for italic text
          }}
          sx={{
            mb: 2,
          }}
        >
          "{t("main_page.get_in_touch.quote1")}
          <br />
          <br />
          {t("main_page.get_in_touch.quote2")}"
        </StyledText>

        <StyledText level="body2" color={PALLETTE.charcoal}>
          <Link href="mailto:lucdow7@gmail.com">lucdow7@gmail.com</Link>
        </StyledText>
        <StyledText
          level="body2"
          color={PALLETTE.charcoal}
          startDecorator={<PhoneIcon />}
          style={{
            justifyContent: isScreenSmall ? "center" : "flex-start",
          }}
        >
          073 551 00 01
        </StyledText>
        <Stack
          spacing={1}
          direction="row"
          mt={3}
          justifyContent={isScreenSmall ? "center" : "flex-start"}
        >
          <Link
            href="https://www.linkedin.com/in/lucas-dow-1315a61b5/"
            target="_blank"
          >
            <LinkedInIcon
              style={{ color: PALLETTE.cerise_dark, fontSize: 32 }}
            />{" "}
          </Link>
          <Link href="https://github.com/DowLucas" target="_blank">
            <GithubIcon style={{ color: PALLETTE.cerise_dark, fontSize: 32 }} />
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ContactDetails;
