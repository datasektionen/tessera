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
  Link,
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
import { Trans, useTranslation } from "react-i18next";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../forms/form_labels";
import InformationModal from "../modal/information";
import FoodPreferencesAgreement from "./food_preferences_agreement";

interface FoodPreferencesProps {
  onSave?: () => void;
}

// Create a constant of all food preferences

const FoodPreferences: React.FC<FoodPreferencesProps> = ({ onSave }) => {
  const {
    userFoodPreferences,
    additionalNotes,
    loading: loadingFoodPref,
    gdpr_agreed: initialGdprAgree,
    needs_to_renew_gdpr: initialNeedsToRenewGdpr,
    save_success,
  } = useSelector((state: RootState) => state.foodPreferences);

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const [value, setValue] = useState<string[]>([]);
  const [additonalNotes, setAdditionalNotes] = useState<string>("");
  const [gdprAgree, setGdprAgree] = useState<boolean>(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false);

  const { guestCustomer, loading } = useSelector(
    (state: RootState) => state.guestCustomer
  );

  const handleChange = (event: any, newValue: string[]) => {
    setValue(newValue);
  };

  const handleSave = () => {
    // Save the food preferences
    if (!gdprAgree) return;

    dispatch(
      updateUserFoodPreferencesStart({
        foodPreferences: value,
        additionalNotes: additonalNotes,
        gdpr_agreed: gdprAgree,
        needs_to_renew_gdpr: initialNeedsToRenewGdpr,
        guestCustomer: guestCustomer,
      })
    );
  };

  useEffect(() => {
    if (loading) return;
    dispatch(
      fetchUserFoodPreferencesStart({
        guestCustomer: guestCustomer,
      })
    );
  }, [dispatch, guestCustomer, loading]);

  useEffect(() => {
    if (save_success && onSave) onSave();
  }, [onSave, save_success]);

  useEffect(() => {
    // setValue for all the food preferences that have checked: true
    if (!userFoodPreferences) return;
    const checkedFoodPrefs = userFoodPreferences.filter((pref) => pref.checked);
    const checkedFoodPrefIds = checkedFoodPrefs.map((pref) => pref.id);
    setValue(checkedFoodPrefIds);
    setGdprAgree(initialNeedsToRenewGdpr ? false : initialGdprAgree);

    if (additionalNotes) setAdditionalNotes(additionalNotes);
  }, [userFoodPreferences, additionalNotes]);

  return (
    <Box
      sx={{
        width: "99%",
        overflow: "hidden",
      }}
    >
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
        <Box mt={4}>
          <FormControl>
            <Checkbox
              checked={gdprAgree}
              onChange={(e) => setGdprAgree(e.target.checked)}
            />
            <StyledFormLabelWithHelperText>
              <Trans i18nKey="profile.food_preferences.gdpr_agree_helperText">
                I agree to the processing of my personal data for the purpose of
                managing my food preferences
                <Link href="#" onClick={() => setShowPrivacyPolicy(true)}>
                  Food Preferences Privacy Policy
                </Link>
              </Trans>
            </StyledFormLabelWithHelperText>
          </FormControl>
        </Box>
        <InformationModal
          isOpen={showPrivacyPolicy}
          onClose={() => setShowPrivacyPolicy(false)}
          title={t("profile.food_preferences.privacy_policy_title")}
          width="75%"
        >
          <FoodPreferencesAgreement />
        </InformationModal>
        <StyledButton
          size="md"
          onClick={handleSave}
          bgColor={PALLETTE.green}
          disabled={!gdprAgree}
        >
          {initialNeedsToRenewGdpr
            ? t("form.button_update_gdpr")
            : t("form.button_save")}
        </StyledButton>
      </Box>
    </Box>
  );
};

export default FoodPreferences;
