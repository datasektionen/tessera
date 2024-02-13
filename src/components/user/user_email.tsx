import { useTranslation } from "react-i18next";
import { IUser } from "../../types";
import UserInfoText from "../text/user_info_text";
import { Box, FormControl, IconButton, Stack } from "@mui/joy";
import { isError } from "lodash";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import InformationModal from "../modal/information";
import { StyledFormLabel } from "../forms/form_labels";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormInput } from "../forms/input_types";
import { StyledErrorMessage } from "../forms/messages";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";
import StyledButton from "../buttons/styled_button";
import axios from "axios";
import { toast } from "react-toastify";
import { AppDispatch } from "../../store";
import { currentUserRequest } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

interface UserEmailProps {
  user: IUser;
}

const UserEmail: React.FC<UserEmailProps> = ({ user }) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const handleSave = (values: { email: string }) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/preferred-email/request`,
        {
          email: values.email,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setOpenEditPreferredEmail(false);
          toast.success(
            "Preferred email change requested, please your KTH email to verify"
          );
          dispatch(currentUserRequest());
        }
      })
      .catch((error: any) => {
        const errorMessage =
          error.response.data.error || "Error updating email";
        toast.error(errorMessage);
      });
  };

  const [openEditPreferredEmail, setOpenEditPreferredEmail] = useState(false);

  return user.is_external ? (
    <UserInfoText label={t("profile.external_email")} value={user.email} />
  ) : (
    <Box>
      <Stack direction="column" spacing={1}>
        <UserInfoText label={t("profile.internal_email")} value={user.email} />
        {user.preferred_email?.ID !== 0 && (
          <Stack direction="row" spacing={1} alignItems="center">
            <UserInfoText
              label={t("profile.preferred_email")}
              value={
                user.preferred_email
                  ? user.preferred_email?.is_verified
                    ? user.preferred_email?.email
                    : user.preferred_email?.email + " (Pending Verification)"
                  : "No preferred email"
              }
              labelStyle={
                user.preferred_email?.is_verified
                  ? {}
                  : { color: PALLETTE.charcoal_see_through }
              }
            />
            <IconButton
              onClick={() => setOpenEditPreferredEmail(true)}
              style={{
                height: 1,
              }}
            >
              <EditIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
      <InformationModal
        isOpen={openEditPreferredEmail}
        onClose={() => setOpenEditPreferredEmail(false)}
        title={t("profile.edit_preferred_email")}
        width="500px"
      >
        <Formik
          initialValues={{
            email: user.preferred_email?.email || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleSave(values);
            actions.setSubmitting(false);
          }}
        >
          {({ isValid }) => (
            <Form>
              <FormControl>
                <StyledText level="body-md" color={PALLETTE.charcoal}>
                  {t("profile.edit_preferred_email_description")}
                </StyledText>
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder={"Email"}
                  overrideStyle={{
                    marginTop: "16px",
                  }}
                />
                <StyledErrorMessage name="email" />
              </FormControl>

              <Stack
                direction="row"
                spacing={2}
                mt={2}
                justifyContent="flex-end"
              >
                <StyledButton
                  size="sm"
                  type="submit"
                  disabled={!isValid}
                  bgColor={isValid ? PALLETTE.green : PALLETTE.charcoal}
                  style={{
                    marginTop: 2,
                  }}
                >
                  {t("form.button_save")}
                </StyledButton>
                <StyledButton
                  size="sm"
                  type="submit"
                  bgColor={PALLETTE.red}
                  style={{
                    marginTop: 2,
                  }}
                >
                  {t("form.button_cancel")}
                </StyledButton>
              </Stack>
            </Form>
          )}
        </Formik>
      </InformationModal>
    </Box>
  );
};

export default UserEmail;
