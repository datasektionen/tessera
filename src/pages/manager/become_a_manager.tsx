import { Box, FormControl, Link } from "@mui/joy";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import {
  IPricingOption,
  PackageTiers,
  pricingOptions,
} from "../pricing/features";
import PricingCard from "../../components/pricing/pricing_card";

import Footer from "../../components/wrappers/footer";

import StandardToastContainer from "../../components/wrappers/toast_container";
import ManagerContactForm from "./plan_contact_form";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GetStartedFreePlanEnrollment from "../../components/manager/register/free/free";
import { useNavigate } from "react-router-dom";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);

const BecomeAManagerPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<IPricingOption | null>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  const scrollToContactForm = () => {
    if (contactFormRef.current) {
      window.scrollTo({
        top: contactFormRef.current.offsetTop - 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (selectedPlan && contactFormRef.current) {
      scrollToContactForm();
    }
  }, [selectedPlan]);

  useEffect(() => {
    // Read plan from query params
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get("plan");

    switch (plan) {
      case PackageTiers.Free:
        setSelectedPlan(pricingOptions[0]);
        break;
      case PackageTiers.SingleEvent:
        setSelectedPlan(pricingOptions[1]);
        scrollToContactForm();
        break;
      case PackageTiers.Professional:
        setSelectedPlan(pricingOptions[2]);
        scrollToContactForm();
        break;
      case PackageTiers.Network:
        setSelectedPlan(pricingOptions[3]);
        scrollToContactForm();
        break;
    }
  }, []);

  if (selectedPlan?.plan === PackageTiers.Free) {
    return <GetStartedFreePlanEnrollment />;
  }

  return (
    <TesseraWrapper>
      <Box
        sx={{
          mt: 5,
          textAlign: "center",
        }}
      >
        <StyledText level="h1" color={PALLETTE.cerise_dark} fontSize={48}>
          {t("become_a_manager.select_plan")}
        </StyledText>
        <StyledText
          level="body-md"
          color={PALLETTE.offBlack}
          fontSize={20}
          sx={{
            textWrap: "balance",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {t("become_a_manager.choose_plan")}
        </StyledText>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: 2, p: 2, mt: 4 }}
      >
        {pricingOptions.map((option: IPricingOption, index: number) => (
          <PricingCard
            key={index}
            option={option}
            billingCycle={"monthly"}
            onSelect={() => setSelectedPlan(option)}
            isSelected={selectedPlan?.title === option.title}
          />
        ))}
      </Box>
      <Box
        sx={{
          mt: 2,
          textAlign: "center",
        }}
      >
        <StyledText
          level="h2"
          color={PALLETTE.charcoal_see_through}
          fontSize={20}
          fontWeight={400}
        >
          <Link
            href="/pricing"
            sx={{
              color: PALLETTE.charcoal_see_through,
              textDecoration: "none",
              "&:hover": {
                color: PALLETTE.charcoal,
              },
            }}
          >
            {t("become_a_manager.full_list_of_features")}
          </Link>
        </StyledText>
      </Box>
      {selectedPlan && (
        <Box
          ref={contactFormRef}
          sx={{
            mt: 10,
            display: "flex",
            justifyContent: "center",
            mb: 30,
            // spacing, bettwen the two components
            gap: 12,
          }}
        >
          <ManagerContactForm plan={selectedPlan?.plan} />
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <StyledText level="h2" color={PALLETTE.cerise_dark} fontSize={24}>
              {t("become_a_manager.selected_plan")}
            </StyledText>
            <PricingCard option={selectedPlan} billingCycle={"monthly"} />
          </MotionBox>
        </Box>
      )}
    </TesseraWrapper>
  );
};

export default BecomeAManagerPage;
