import { Box, FormControl, Link } from "@mui/joy";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import { IPricingOption, pricingOptions } from "../pricing/features";
import PricingCard from "../../components/pricing/pricing_card";

import Footer from "../../components/wrappers/footer";

import StandardToastContainer from "../../components/wrappers/toast_container";
import ManagerContactForm from "./plan_contact_form";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const BecomeAManagerPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<IPricingOption | null>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (selectedPlan && contactFormRef.current) {
      window.scrollTo({
        top: contactFormRef.current.offsetTop - 200,
        behavior: "smooth",
      });
    }
  }, [selectedPlan]);

  return (
    <Box sx={{}}>
      <StandardToastContainer />
      <Box
        sx={{
          mt: 10,
          textAlign: "center",
        }}
      >
        <StyledText level="h1" color={PALLETTE.cerise_dark} fontSize={48}>
          Select Plan
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
          Choose the plan that works best for you. When contacting us, please
          let us know which plan you are interested in and what you would like
          to know more about.
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
            Full list of features
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
              Selected Plan
            </StyledText>
            <PricingCard option={selectedPlan} billingCycle={"monthly"} />
          </MotionBox>
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default BecomeAManagerPage;
