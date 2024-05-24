import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { useNetworkDetails } from "../../../hooks/manager/network_details_hook";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getNetworkEventsRequest } from "../../../redux/features/manager/listNetworkEventsSlice";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import DrawerBoxWrapper from "../../../components/wrappers/manager_wrapper";
import Title from "../../../components/text/title";
import StyledText from "../../../components/text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { compareAsc } from "date-fns";
import { eventIsInThePast } from "../../../utils/date_conversions";
import {
    ApplicationStatusColors,
    AvaialableCountries,
    BusinessDetailsFormValues,
    IEvent,
    INetwork,
    SurfApplicationStatus,
} from "../../../types";
import { Box, Divider, Grid, Link, Stack } from "@mui/joy";
import EventCard from "../../../components/events/event_card";

import React from "react";
import { t } from "i18next"; // Adjust import based on your i18n setup
import BusinessDetailsForm from "./business_details";
import axios from "axios";
import ApiRoutes from "../../../routes/backend_routes";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";

interface OnboardingStepProps {
    onBusinessFormSubmit: (values: BusinessDetailsFormValues) => void;
    activeStep: number;
    network: INetwork;
}

const OnboardingContent: React.FC<OnboardingStepProps> = ({
    onBusinessFormSubmit,
    activeStep,
    network,
}) => {
    return (
        <div style={{ lineHeight: 1.6 }}>
            <StyledText
                fontSize={26}
                fontWeight={700}
                color={PALLETTE.charcoal}
                level="h2"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.welcomeMessage")}
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="body-sm"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.intro")}
            </StyledText>
            <StyledText
                fontSize={24}
                fontWeight={600}
                color={PALLETTE.charcoal}
                level="h3"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.stepByStepGuide")}
            </StyledText>

            <StyledText
                fontSize={20}
                fontWeight={600}
                color={PALLETTE.charcoal}
                level="h4"
                startDecorator={
                    activeStep > 0 ? <CheckCircleIcon color="success" /> : <PendingIcon color={activeStep === 0 ? "warning" : "info"} />
                }
                style={{ marginBottom: "10px" }}
            >
                {t("manager.onboarding.steps.step1.title")}
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.steps.step1.description")}
            </StyledText>

            {activeStep === 0 && <BusinessDetailsForm submit={onBusinessFormSubmit} />}
            <Divider sx={{ my: 0.25 }} />
            <StyledText
                fontSize={20}
                fontWeight={600}
                color={PALLETTE.charcoal}
                level="h4"
                sx={{
                    mb: 1,
                    mt: 3
                }}
                startDecorator={
                    activeStep > 1 ? <CheckCircleIcon color="success" /> : <PendingIcon color={activeStep === 1 ? "warning" : "info"} />
                }
            >
                {t("manager.onboarding.steps.step2.title")}
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
            >
                {t("manager.onboarding.steps.step2.description")}
            </StyledText>

            {activeStep === 1 && (
                <>
                    <StyledText
                        fontSize={18}
                        fontWeight={600}
                        color={PALLETTE.charcoal}
                        level="h4"
                        sx={{
                            mt: 1
                        }}
                    >
                        {t("manager.onboarding.steps.step2.active")}
                    </StyledText>

                    <Link href={network?.merchant?.webKybUrl} target="_blank">
                        <StyledText fontSize={18} fontWeight={400} color={PALLETTE.cerise_dark} level="h4">
                            {network?.merchant?.webKybUrl}
                        </StyledText>
                    </Link>
                </>
            )}
            <Divider sx={{ my: 0.25 }} />

            <StyledText
                fontSize={20}
                fontWeight={600}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "10px" }}
                sx={{
                    mb: 1,
                    mt: 3
                }}
                startDecorator={
                    activeStep > 2 ? <CheckCircleIcon color="success" /> : <PendingIcon color={activeStep === 2 ? "warning" : "info"} />
                }
            >
                {t("manager.onboarding.steps.step3.title")}
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.steps.step3.description")}
            </StyledText>

            <Divider sx={{ my: 0.25 }} />

            <StyledText
                fontSize={22}
                fontWeight={600}
                color={PALLETTE.charcoal}
                level="h4"
                sx={{
                    mb: 1,
                    mt: 3
                }}
                startDecorator={
                    activeStep > 3 ? <CheckCircleIcon color="success" /> : <PendingIcon color={activeStep === 3 ? "warning" : "info"} />
                }
            >
                {t("manager.onboarding.steps.step4.title")}
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.steps.step4.description")}
            </StyledText>

            <StyledText
                fontSize={26}
                fontWeight={600}
                color={PALLETTE.charcoal}
                level="h3"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.customization.title")}
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.customization.description")}
            </StyledText>

            <StyledText
                fontSize={26}
                fontWeight={600}
                color={PALLETTE.charcoal}
                level="h3"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.importantLinks.title")}
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "10px" }}
            >
                <a href={t("manager.onboarding.importantLinks.links.partnersGuide")}>
                    {t("manager.onboarding.importantLinks.links.partnersGuide")}
                </a>
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "10px" }}
            >
                <a href={t("manager.onboarding.importantLinks.links.merchantsGuide")}>
                    {t("manager.onboarding.importantLinks.links.merchantsGuide")}
                </a>
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "10px" }}
            >
                <a href={t("manager.onboarding.importantLinks.links.storesGuide")}>
                    {t("manager.onboarding.importantLinks.links.storesGuide")}
                </a>
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "10px" }}
            >
                <a href={t("manager.onboarding.importantLinks.links.terminalsGuide")}>
                    {t("manager.onboarding.importantLinks.links.terminalsGuide")}
                </a>
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "10px" }}
            >
                <a
                    href={t("manager.onboarding.importantLinks.links.onboardingRequirements")}
                >
                    {t("manager.onboarding.importantLinks.links.onboardingRequirements")}
                </a>
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "15px" }}
            >
                <a href={t("manager.onboarding.importantLinks.links.onlinePaymentsGuide")}>
                    {t("manager.onboarding.importantLinks.links.onlinePaymentsGuide")}
                </a>
            </StyledText>

            <StyledText
                fontSize={26}
                fontWeight={600}
                color={PALLETTE.charcoal}
                level="h3"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.needHelp.title")}
            </StyledText>
            <StyledText
                fontSize={18}
                fontWeight={400}
                color={PALLETTE.charcoal}
                level="h4"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.needHelp.description")}
            </StyledText>

            <StyledText
                fontSize={30}
                fontWeight={700}
                color={PALLETTE.charcoal}
                level="h2"
                style={{ marginBottom: "15px" }}
            >
                {t("manager.onboarding.thankYou")}
            </StyledText>
        </div>
    );
};

const merchantSteps = {
    businessDetails: 0,
    KYB: 1,
    KYBSubmitted: 2,
    verification: 3,
    completed: 4,
};

const ManagerSetupPage: React.FC = () => {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);

    const { network, loading } = useNetworkDetails();

    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getNetworkEventsRequest());
    }, []);

    useEffect(() => {
        // Sets the current active step on load
        if (network?.merchant.applicationStatus) {
            switch (network.merchant.applicationStatus.toLowerCase() as SurfApplicationStatus) {
                case SurfApplicationStatus.ApplicationNotStarted:
                    setActiveStep(merchantSteps.businessDetails);
                    break;
                case SurfApplicationStatus.ApplicationInitiated:
                    setActiveStep(merchantSteps.KYB);
                    break;
                case SurfApplicationStatus.ApplicationSubmitted:
                    setActiveStep(merchantSteps.KYBSubmitted);
                    break;
                case SurfApplicationStatus.ApplicationCompleted:
                case SurfApplicationStatus.ApplicationSigned:
                    setActiveStep(merchantSteps.verification);
                    break;
                case SurfApplicationStatus.MerchantCreated:
                    setActiveStep(merchantSteps.completed);
                    break;
            }
        }
    }, [network]);

    const onBusinessFormSubmit = async (values: BusinessDetailsFormValues) => {
        const phone_code = AvaialableCountries.find(
            (country) => country.code === values.country_code
        )?.phone;

        if (!phone_code) {
            return;
        }

        const data = {
            country_code: values.country_code,
            legal_name: values.legal_name,
            corporate_id: values.corporate_id,
            address_line1: values.address_line1,
            address_line2: values.address_line2,
            city: values.city,
            postal_code: values.postal_code,
            phone_number: values.phone_number,
            business_email: values.business_email,
            store_name: values.store_name,
            phone_code: phone_code,
        };

        // manager/network/merchant POST
        try {
            const response = await axios.post(
                ApiRoutes.generateRoute(ApiRoutes.MANAGER_NETWORK_MERCHANT, {}),
                data,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                toast.success("Business details saved successfully");
                setTimeout(() => {
                    // reload
                    window.location.reload();
                }, 2000);
            } else {
                toast.error("An error occurred");
            }
        } catch (error: any) {
            console.log(error);
            const errorMessage =
                error.response.data.error ||
                error.message ||
                error.response.statusText ||
                "An error occurred";
            toast.error(errorMessage);
        }
    };

    const application_color =
        ApplicationStatusColors[
        network?.merchant.applicationStatus
            ? (network?.merchant.applicationStatus.toLowerCase() as SurfApplicationStatus)
            : SurfApplicationStatus.ApplicationNotStarted
        ];

    console.log(activeStep)

    return (
        <MUITesseraWrapper>
            <DrawerBoxWrapper showManagerDashboard={true}>
                <Stack
                    spacing={4}
                    direction="row"
                    alignItems="center"
                    justifyContent={"space-between"}
                    sx={{
                        mr: 7,
                        mb: 2,
                    }}
                >
                    <Title
                        fontSize={38}
                        style={{
                            textTransform: "capitalize",
                        }}
                    >
                        {t("manager.setup.title")}
                    </Title>
                    <Box
                        sx={{
                            borderRadius: "8px",
                            backgroundColor: application_color,
                            border: "1px solid",
                        }}
                    >
                        <StyledText
                            fontSize={18}
                            fontWeight={700}
                            color={PALLETTE.black}
                            level="body-md"
                            style={{
                                padding: "8px 16px",
                                textTransform: "capitalize",
                            }}
                        >
                            {network?.merchant.applicationStatus
                                ? network?.merchant.applicationStatus.split("_").join(" ").toLowerCase()
                                : "Not Started"}
                        </StyledText>
                    </Box>
                </Stack>

                <OnboardingContent
                    onBusinessFormSubmit={onBusinessFormSubmit}
                    activeStep={activeStep}
                    network={network!}
                />
            </DrawerBoxWrapper>
        </MUITesseraWrapper>
    );
};

export default ManagerSetupPage;
