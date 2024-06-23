import { Box, Grid } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MUITesseraWrapper from "../../components/wrappers/page_wrapper_mui";
import classes from "./pricing.module.css";
import TicketFees from "./ticket_fees";
import FeatureTable from "./feature-table";
import {
  IPricingOption,
  PackageTiers,
  PaymentPlanOption,
  pricingOptions,
} from "./features";
import PricingCard from "../../components/pricing/pricing_card";
import { useNavigate } from "react-router-dom";
import featuresJSON from "./features/features.json";
import { IPricingFeature } from "./features/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import InformationModal from "../../components/modal/information";
import ManagerContactForm from "../manager/plan_contact_form";
import { MotionBox } from "../../components/misc/motion_box";
import { useTranslation } from "react-i18next";
// In your component render method:

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [featuresGroups, setFeaturesGroups] = useState<{
    [key: string]: IPricingFeature[];
  }>({});
  const [selectedPlan, setSelectedPlan] = useState<IPricingOption | null>(null);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const contactFormRef = React.useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Group the features by group
    const features = featuresJSON as IPricingFeature[];
    const groups: { [key: string]: IPricingFeature[] } = {};

    features.forEach((feature) => {
      if (!groups[feature.group]) {
        groups[feature.group] = [];
      }

      groups[feature.group].push(feature);
    });

    setFeaturesGroups(groups);
  }, []);

  const [billingCycle, setBillingCycle] =
    useState<PaymentPlanOption>("monthly");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    billingCycle: string
  ) => {
    if (billingCycle === null) return;

    setBillingCycle(billingCycle as keyof IPricingOption["price"]);
  };

  const handleSelect = (plan: PackageTiers) => {
    if (isLoggedIn) {
      navigate("/become-a-manager?plan=" + plan);
    } else {
      setSelectedPlan(
        pricingOptions.find((option) => option.plan === plan) || null
      );
      setShowContactModal(true);
    }
  };

  return (
    <MUITesseraWrapper>
      <InformationModal
        title="Contact Us"
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        width="60%"
      >
        <Box
          ref={contactFormRef}
          sx={{
            display: "flex",
            justifyContent: "center",
            // spacing, bettwen the two components
            gap: 12,
          }}
        >
          <ManagerContactForm plan={selectedPlan?.plan!} />
          <Box>
            <StyledText level="h2" color={PALLETTE.cerise_dark} fontSize={24}>
              {t("become_a_manager.selected_plan")}
            </StyledText>
            <PricingCard option={selectedPlan!} billingCycle={"monthly"} />
          </Box>
        </Box>
      </InformationModal>
      <Box
        sx={{
          minHeight: 180,
        }}
      >
        <div className={classes.wave}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className={classes.shape_fill}
            ></path>
          </svg>
        </div>
        <Box
          sx={{
            position: "absolute",
            transform: "translateX(-50%)",
            left: "50%",
            top: "75px",
          }}
        >
          <StyledText
            color={PALLETTE.cerise_dark}
            level="h1"
            fontSize={84}
            fontWeight={600}
            sx={{ textAlign: "center", mb: 2 }}
            style={{
              letterSpacing: "0.05em",
            }}
          >
            Pricing
          </StyledText>
          <StyledText
            color={PALLETTE.offBlack}
            level="body-md"
            fontSize={24}
            sx={{ textAlign: "center", mb: 2 }}
          >
            Choose the plan that works best for you
          </StyledText>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <StyledText
          color={PALLETTE.charcoal_see_through}
          level="body-sm"
          fontSize={14}
        >
          How do you wish to pay?
        </StyledText>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ToggleButtonGroup
            value={billingCycle}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton
              value="monthly"
              sx={{
                borderRadius: "16px 0px 0px 16px",
                borderColor: PALLETTE.cerise_dark,
                backgroundColor:
                  billingCycle === "monthly"
                    ? PALLETTE.white
                    : PALLETTE.offWhite,
              }} // top-left and bottom-left
            >
              <StyledText
                color={PALLETTE.charcoal}
                level="body-sm"
                fontSize={14}
              >
                Monthly
              </StyledText>
            </ToggleButton>
            <ToggleButton
              value="yearly"
              sx={{
                borderRadius: "0px 16px 16px 0px",
                borderColor: PALLETTE.cerise_dark,
                backgroundColor:
                  billingCycle === "yearly"
                    ? PALLETTE.white
                    : PALLETTE.offWhite,
              }} // top-right and bottom-right
            >
              <StyledText
                color={PALLETTE.charcoal}
                level="body-sm"
                fontSize={14}
              >
                Yearly
                <Box>
                  <StyledText
                    color={PALLETTE.dark_red}
                    level="body-sm"
                    fontSize={12}
                    fontWeight={700}
                  >
                    30% off
                  </StyledText>
                </Box>
              </StyledText>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, p: 2 }}>
        {pricingOptions.map((option: IPricingOption, index: number) => (
          <PricingCard
            key={index}
            option={option}
            billingCycle={billingCycle}
            onSelect={() => {
              handleSelect(option.plan);
            }}
          />
        ))}
      </Box>

      {/*VAT INFO*/}
      <Box>
        <StyledText
          color={PALLETTE.charcoal}
          level="body-sm"
          fontSize={16}
          sx={{ textAlign: "center" }}
        >
          All prices are excluding VAT.
        </StyledText>
      </Box>

      {/* Ticket fees */}
      <TicketFees />
      <Box
        sx={{
          mt: 8,
        }}
      >
        <StyledText
          level="h4"
          color={PALLETTE.cerise_dark}
          fontSize={32}
          sx={{
            textAlign: "center",
          }}
        >
          List of Features
        </StyledText>

        <Grid
          justifyContent={"center"}
          container
          spacing={5}
          sx={{
            mt: 2,
          }}
        >
          {Object.entries(featuresGroups).map(([group, features]) => (
            <Grid xs={12}>
              <FeatureTable
                group_name={group.replace("_", " ")}
                features={features}
              />
            </Grid>
          ))}
        </Grid>
        {/* Group by feature group */}
      </Box>
    </MUITesseraWrapper>
  );
};

export default PricingPage;
