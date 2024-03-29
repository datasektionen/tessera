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
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const ContactDetails = () => {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, type: "spring" },
    },
  };

  const fadeInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, type: "spring" },
    },
  };

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
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInFromLeft}
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
        </motion.div>
      </Grid>

      <Grid
        sm={12}
        md={6}
        style={{
          textAlign: isScreenSmall ? "center" : "left",
        }}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInFromRight}
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
              <GithubIcon
                style={{ color: PALLETTE.cerise_dark, fontSize: 32 }}
              />
            </Link>
          </Stack>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default ContactDetails;
