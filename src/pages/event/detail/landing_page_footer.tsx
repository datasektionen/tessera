import { Box, Grid, Link, Stack, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import StyledText from "../../../components/text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const LandingPageFooter: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    return (
        <Box
            sx={{
                backgroundColor: PALLETTE.offBlack,
                color: PALLETTE.offWhite,
                padding: "20px 0",
                width: "100%",
            }}
        >
            <Grid
                container
                spacing={2}
                flexDirection={isScreenSmall ? "column" : "row"}
                justifyContent="center"
                alignItems="flex-start"
                mx={isScreenSmall ? "5%" : "20%"}
            >

                {/* Quick Links */}
                <Grid xs={isScreenSmall ? 12 : 3}>
                    <StyledText
                        color={PALLETTE.offWhite}
                        level="body-sm"
                        fontSize={20}
                        fontWeight={700}
                    >
                        {t("footer.quick_links_title")}
                    </StyledText>
                    <Stack direction={"column"} spacing={0}>
                        <Link href="/">Home</Link>
                        {isLoggedIn ?
                            <Link href="/profile">Profile</Link> :
                            <Link href="/login">Sign up</Link>
                        }
                        <Link href="/contact">Contact</Link>
                        <Link href="/become-a-manager">Become a manager</Link>
                        <Link href="/terms">Terms & Conditions</Link>
                        <Link href="/privacy">Privacy Policy</Link>
                    </Stack>
                </Grid>

                <Grid xs={isScreenSmall ? 12 : 3}>
                    <StyledText
                        color={PALLETTE.offWhite}
                        level="body-sm"
                        fontSize={20}
                        fontWeight={700}
                    >
                        {t("footer.about_title")}
                    </StyledText>
                    <Stack direction={"column"} spacing={0}>
                        <Link href="/contact">This is Tessera</Link>
                        <Link href="/terms">Who are we?</Link>
                        <Link href="/product">Product</Link>
                        <Link href="/pricing">Pricing</Link>
                    </Stack>
                </Grid>

                {/* Contact Information */}
                <Grid xs={isScreenSmall ? 12 : 3}>
                    <StyledText
                        color={PALLETTE.offWhite}
                        level="body-sm"
                        fontSize={20}
                        fontWeight={700}
                    >
                        {t("footer.contact_title")}
                    </StyledText>
                    <StyledText color={PALLETTE.offWhite}
                        level="body-sm" fontSize={18}>
                        <Link href="mailto:info@tesseratickets.se">
                            info@tesseratickets.se
                        </Link>
                    </StyledText>
                </Grid>

                {/* Social Media Links */}
                <Grid xs={isScreenSmall ? 12 : 3}>
                    <StyledText
                        color={PALLETTE.offWhite}
                        level="body-sm"
                        fontSize={20}
                        fontWeight={700}
                    >
                        {t("footer.follow_us")}
                    </StyledText>
                    <StyledText
                        color={PALLETTE.offWhite}
                        level="body-sm"
                        fontSize={18}
                    >
                        <Link href="https://www.linkedin.com/company/dow-technology/" target="_blank">LinkedIn</Link>
                    </StyledText>
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <StyledText
                    color={PALLETTE.cerise}
                    level="body-sm"
                    fontSize={48}
                >
                    Tessera
                </StyledText>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <StyledText
                    color={PALLETTE.offWhite}
                    level="body-sm"
                    fontSize={18}
                >
                    © {new Date().getFullYear()} Dow Technology. All rights reserved.
                </StyledText>

            </Box>
        </Box>
    );
};

export default LandingPageFooter;
