import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Option,
  Select,
  Stack,
  TextField,
  Textarea,
  Typography,
} from "@mui/joy";
import Title from "../text/title";
import { useEffect, useState } from "react";
import PALLETTE from "../../theme/pallette";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  fetchUserFoodPreferencesStart,
  updateUserFoodPreferencesStart,
} from "../../redux/features/userFoodPreferences";
import LoadingOverlay from "../Loading";
import SaveButton from "../buttons/save_button";

interface FoodPreferencesProps {}

// Create a constant of all food preferences

const FoodPreferences: React.FC<FoodPreferencesProps> = ({}) => {
  const {
    userFoodPreferences,
    additionalNotes,
    loading: loadingFoodPref,
  } = useSelector((state: RootState) => state.foodPreferences);

  const dispatch: AppDispatch = useDispatch();

  const [value, setValue] = useState<string[]>([]);
  const [additonalNotes, setAdditionalNotes] = useState<string>("");

  const handleChange = (event: any, newValue: string[]) => {
    setValue(newValue);
  };

  const handleSave = () => {
    // Save the food preferences
    dispatch(
      updateUserFoodPreferencesStart({
        foodPreferences: value,
        additionalNotes: additonalNotes,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchUserFoodPreferencesStart());
  }, [dispatch]);

  useEffect(() => {
    // setValue for all the food preferences that have checked: true
    if (!userFoodPreferences) return;
    const checkedFoodPrefs = userFoodPreferences.filter((pref) => pref.checked);
    const checkedFoodPrefIds = checkedFoodPrefs.map((pref) => pref.id);
    setValue(checkedFoodPrefIds);

    if (additionalNotes) setAdditionalNotes(additionalNotes);
  }, [userFoodPreferences, additionalNotes]);

  return (
    <>
      {loadingFoodPref && <LoadingOverlay />}
      <Title fontSize={24}>Food Preferences</Title>
      <Box>
        <FormControl>
          <FormLabel>
            <Typography
              level="body-sm"
              fontFamily={"Josefin sans"}
              fontWeight={700}
              style={{
                color: PALLETTE.charcoal,
              }}
            >
              Allergies & Dietary Restrictions (Select all that apply)
            </Typography>
          </FormLabel>
          <Select
            multiple
            value={value}
            placeholder="Select your food preferences"
            onChange={handleChange}
            sx={{
              minWidth: "13rem",
            }}
            style={{
              borderColor: PALLETTE.cerise,
            }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", gap: "0.25rem" }}>
                {selected.map((selectedOption) => (
                  <Chip variant="soft" color="primary">
                    {selectedOption.label}
                  </Chip>
                ))}
              </Box>
            )}
            slotProps={{
              listbox: {
                sx: {
                  width: "100%",
                },
              },
            }}
          >
            {userFoodPreferences?.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.label}
              </Option>
            ))}
          </Select>
          <FormHelperText>
            Select all that apply, leave blank if none apply .
          </FormHelperText>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        <FormControl>
          <FormLabel>
            <Typography
              level="body-sm"
              fontFamily={"Josefin sans"}
              fontWeight={700}
              style={{
                color: PALLETTE.charcoal,
              }}
            >
              Additonal Notes
            </Typography>
          </FormLabel>
          <Textarea
            placeholder=""
            minRows={2}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            value={additonalNotes}
          />
          <FormHelperText>
            Provide any additional notes here regarding your food preferences.
            Leave blank if you have none.
          </FormHelperText>
        </FormControl>
        <SaveButton onClick={handleSave} />
      </Box>
    </>
  );
};

export default FoodPreferences;
