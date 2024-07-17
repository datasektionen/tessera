import { Box } from "@mui/joy";
import { IGuestCustomer, ITicketRelease } from "../../../../types";
import UserFoodPreferences from "../../../../redux/features/userFoodPreferences";
import FoodPreferences from "../../../food_preferences";

interface MakeTicketOrderFormDetailsProps {
  ticketRelease: ITicketRelease;
  onContinue: () => void;
}

const MakeTicketOrderFormDetails: React.FC<MakeTicketOrderFormDetailsProps> = ({
  ticketRelease,
  onContinue,
}) => {
  return (
    <Box>
      <FoodPreferences onSave={onContinue} />
    </Box>
  );
};

export default MakeTicketOrderFormDetails;
