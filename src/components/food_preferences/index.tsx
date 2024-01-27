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
import StyledButton from "../buttons/styled_button";
import { useTranslation } from "react-i18next";
import { StyledFormLabelWithHelperText } from "../forms/form_labels";

interface FoodPreferencesProps {}

// Create a constant of all food preferences

const FoodPreferences: React.FC<FoodPreferencesProps> = ({}) => {
  const {
    userFoodPreferences,
    additionalNotes,
    loading: loadingFoodPref,
  } = useSelector((state: RootState) => state.foodPreferences);

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

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
      <Title fontSize={24}>{t("profile.food_preferences.title")}</Title>
      <Box>
        <FormControl>
          <FormLabel>
            <Typography
              level="body-sm"
              fontFamily={"Josefin sans"}
              fontSize={18}
              fontWeight={700}
              style={{
                color: PALLETTE.charcoal,
              }}
            >
              {t("profile.food_preferences.allergies_and_dietary_restrictions")}
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
          <StyledFormLabelWithHelperText>
            {t(
              "profile.food_preferences.allergies_and_dietary_restrictions_helperText"
            )}
          </StyledFormLabelWithHelperText>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        <FormControl>
          <FormLabel>
            <Typography
              level="body-sm"
              fontFamily={"Josefin sans"}
              fontSize={18}
              fontWeight={700}
              style={{
                color: PALLETTE.charcoal,
              }}
            >
              {t("profile.food_preferences.additional_notes")}
            </Typography>
          </FormLabel>
          <Textarea
            placeholder=""
            minRows={2}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            value={additonalNotes}
          />
          <StyledFormLabelWithHelperText>
            {t("profile.food_preferences.additional_notes_helperText")}
          </StyledFormLabelWithHelperText>
        </FormControl>
        <StyledButton size="md" onClick={handleSave} bgColor={PALLETTE.green}>
          {t("form.button_save")}
        </StyledButton>
      </Box>
    </>
  );
};

export default FoodPreferences;
