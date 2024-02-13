import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { IOrganization } from "../../../types";
import { useEffect, useState } from "react";
import { FormControl, FormLabel } from "@mui/joy";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../forms/form_labels";
import { FormInput } from "../../forms/input_types";
import StyledButton from "../../buttons/styled_button";
import * as Yup from "yup";
import PALLETTE from "../../../theme/pallette";
import { StyledErrorMessage } from "../../forms/messages";
import {
  getMyOrganizationsRequest,
  updateOrganizationStart,
} from "../../../redux/features/organizationSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

interface EditOrganizationValues {
  name: string;
  email: string;
}

interface EditOrganizationProps {
  organization: IOrganization;
}

const EditOrganization: React.FC<EditOrganizationProps> = ({
  organization,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState<EditOrganizationValues>({
    name: organization.name,
    email: organization.email,
  });

  const { updateSuccess } = useSelector(
    (state: RootState) => state.organization
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getMyOrganizationsRequest());
    }
  }, [dispatch, updateSuccess]);

  const handleUpdateOrganization = (values: EditOrganizationValues) => {
    dispatch(
      updateOrganizationStart({
        id: organization.id,
        name: values.name,
        email: values.email,
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      onSubmit={(values) => {
        handleUpdateOrganization(values);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <FormControl>
            <StyledFormLabel>
              {t("profile.your_teams.team_name_title")}
            </StyledFormLabel>
            <FormInput
              placeholder="Lit Club"
              name="name"
              type="text"
              label="Name"
            />
            <StyledErrorMessage name="name" />
            {/* Team email */}
          </FormControl>
          <FormControl>
            <StyledFormLabel>{t("create_team.add_team_email")}</StyledFormLabel>
            <FormInput
              name="email"
              type="email"
              label="Email"
              placeholder="example@datasektionen.se"
            />
            <StyledErrorMessage name="email" />
          </FormControl>

          <StyledButton
            size="md"
            type="submit"
            disabled={!isValid} // Change when ready
            bgColor={isValid ? PALLETTE.green : PALLETTE.charcoal}
            style={{
              marginTop: "16px",
              width: "200px",
            }}
          >
            {t("form.button_submit")}
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default EditOrganization;
