import { Box, Grid, Link, Stack } from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";
import { Trans, useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          backgroundColor: PALLETTE.offBlack,
          height: "200px",
          width: "100vw",
          marginTop: 30,
        }}
      >
        <Grid
          container
          columns={15}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          pt={4}
          mx={24}
        >
          <Grid xs={5}>
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
          <Grid xs={5}>
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

          <Grid xs={5}>
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
          width: "100vw",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledText
          level="body-sm"
          fontSize={20}
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
      </Box>
    </>
  );
};

export default Footer;
