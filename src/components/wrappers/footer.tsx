import { Box, Grid, Link, Stack } from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";
import { Trans, useTranslation } from "react-i18next";
import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { is } from "date-fns/locale";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        sx={{
          backgroundColor: PALLETTE.offBlack,
          height: "fit-content",
          width: "100%",
          marginTop: 30,
        }}
        py={4}
      >
        <Grid
          container
          columns={15}
          flexDirection={isScreenSmall ? "column" : "row"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          pt={1}
          spacing={isScreenSmall ? 2 : 0}
          mx={isScreenSmall ? "5%" : "20%"}
        >
          <Grid xs={isScreenSmall ? 15 : 5}>
            <StyledText
              level="body-sm"
              fontSize={20}
              fontWeight={700}
              color={PALLETTE.offWhite}
            >
              {t("footer.about_title")}
            </StyledText>
            <StyledText level="body-sm" fontSize={18} color={PALLETTE.offWhite}>
              {t("footer.about_content")}
            </StyledText>

            {/* Add content for Section 1 here */}
          </Grid>
          <Grid xs={isScreenSmall ? 15 : 5}>
            <StyledText
              level="body-sm"
              fontSize={20}
              fontWeight={700}
              color={PALLETTE.offWhite}
            >
              {t("footer.quick_links_title")}
            </StyledText>

            <Stack direction={"column"} spacing={0}>
              <StyledText
                level="body-sm"
                fontSize={18}
                color={PALLETTE.offWhite}
              >
                <Link href="/">{t("footer.home")}</Link>
              </StyledText>
              <StyledText
                level="body-sm"
                fontSize={18}
                color={PALLETTE.offWhite}
              >
                <Link href="/events/">{t("footer.events")}</Link>
              </StyledText>
              <StyledText
                level="body-sm"
                fontSize={18}
                color={PALLETTE.offWhite}
              >
                <Link href="/profile">{t("footer.profile")}</Link>
              </StyledText>
            </Stack>
            {/* Add content for Section 2 here */}
          </Grid>

          <Grid xs={isScreenSmall ? 15 : 5}>
            <StyledText
              level="body-sm"
              fontSize={20}
              fontWeight={700}
              color={PALLETTE.offWhite}
            >
              {t("footer.report_an_issue_title")}
            </StyledText>
            <StyledText level="body-sm" fontSize={18} color={PALLETTE.offWhite}>
              <Trans i18nKey="footer.report_an_issue_content">
                If something isn't working, or you have a suggestion, You can
                <Link
                  href="https://github.com/datasektionen/tessera/issues"
                  target="_blank"
                >
                  Report an issue on GitHub
                </Link>
              </Trans>
            </StyledText>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: PALLETTE.cerise,
          height: "50px",
          width: "100%",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <StyledText
          level="body-sm"
          fontSize={isScreenSmall ? 14 : 20}
          fontWeight={600}
          color={PALLETTE.charcoal}
        >
          <Trans i18nKey="footer.made_by">
            Made with ❤️ by
            <Link href="https://datasektionen.se" target="_blank">
              Konglig Datasektionen
            </Link>
          </Trans>
        </StyledText>
        <Link
          href="https://www.youtube.com/watch?v=7IZ-Fek2kzE&ab_channel=ForestFilmStudio"
          target="_blank"
        >
          <StyledText
            level="body-sm"
            fontSize={1}
            fontWeight={600}
            color={PALLETTE.charcoal}
          >
            Issa made the mushroom logo 🍄
          </StyledText>
        </Link>
      </Box>
    </>
  );
};

export default Footer;
