import { Box } from "@mui/joy";
import {
  IGuestCustomer,
  ITicketRelease,
  ITicketRequest,
} from "../../../../types";
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
      <FoodPreferences onSave={onContinue} />
    </Box>
  );
};

export default MakeTicketRequestFormDetails;
