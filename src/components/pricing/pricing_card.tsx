import { Card, CardContent, Divider, Box } from "@mui/joy";
import StyledText from "../../components/text/styled_text";
import StyledButton from "../../components/buttons/styled_button";
import PALLETTE from "../../theme/pallette";
import { getPriceText } from "../../pages/pricing/get_price_text";
import { IPricingOption } from "../../pages/pricing/features";
import { motion } from "framer-motion";

interface PricingCardProps {
  option: IPricingOption;
  billingCycle: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const MotionCard = motion(Card);

const PricingCard: React.FC<PricingCardProps> = ({
  option,
  billingCycle,
  isSelected = false,
  onSelect,
}) => (
  <MotionCard
    variant="outlined"
    sx={{
      width: 300,
      minHeight: 400,
      backgroundColor: option.highlighted
        ? PALLETTE.offBlack
        : option.background!,
      background: option.background || "none",
      color: option.highlighted ? "common.white" : "text.primary",
    }}
    animate={{
      y: isSelected ? -20 : 0,
    }}
    transition={{ duration: 0.5 }}
  >
    <CardContent>
      <StyledText
        color={option.highlighted ? PALLETTE.white : PALLETTE.charcoal}
        level="h2"
        fontSize={24}
        fontWeight={600}
        sx={{ mb: 1 }}
      >
        {option.title}
      </StyledText>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mb: 2, minHeight: 300 }}>
        {option.features.map((feature, idx) => (
          <StyledText
            key={idx}
            color={option.highlighted ? "common.white" : "text.primary"}
            level="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Box component="span" sx={{ display: "inline-block", width: 24 }}>
              ✓
            </Box>{" "}
            {feature}
          </StyledText>
        ))}
      </Box>
      <StyledText
        color={option.highlighted ? PALLETTE.white : PALLETTE.charcoal}
        level="h3"
        sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: 2 }}
      >
        {getPriceText(option, billingCycle)}
      </StyledText>
      {onSelect && (
        <StyledButton
          bgColor={
            option.title === "Free"
              ? PALLETTE.green
              : option.highlighted
              ? PALLETTE.cerise
              : PALLETTE.charcoal
          }
          color={option.highlighted ? PALLETTE.offBlack : PALLETTE.white}
          size="md"
          sx={{ width: "100%" }}
          onClick={() => {
            onSelect();
          }}
        >
          {option.title === "Free" ? "Get Started" : "Contact"}
        </StyledButton>
      )}
    </CardContent>
  </MotionCard>
);

export default PricingCard;
