import { Box } from "@mui/joy";
import { ITicketRelease, ITicketRequest } from "../../../../types";
import UserFoodPreferences from "../../../../redux/features/userFoodPreferences";
import FoodPreferences from "../../../food_preferences";

interface MakeTicketRequestFormDetailsProps {
  ticketRelease: ITicketRelease;
  onContinue: () => void;
}

const MakeTicketRequestFormDetails: React.FC<
  MakeTicketRequestFormDetailsProps
> = ({ ticketRelease, onContinue }) => {
  return (
    <Box>
      <FoodPreferences />
    </Box>
  );
};

export default MakeTicketRequestFormDetails;
