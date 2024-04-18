import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { ITeam } from "../../../types";
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
  getMyTeamsRequest,
  updateTeamStart,
} from "../../../redux/features/teamSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

interface EditTeamValues {
  name: string;
  email: string;
}

interface EditTeamProps {
  team: ITeam;
}

const EditTeam: React.FC<EditTeamProps> = ({ team }) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState<EditTeamValues>({
    name: team.name,
    email: team.email,
  });

  const { updateSuccess } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getMyTeamsRequest());
    }
  }, [dispatch, updateSuccess]);

  const handleUpdateTeam = (values: EditTeamValues) => {
    dispatch(
      updateTeamStart({
        id: team.id,
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
        handleUpdateTeam(values);
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
              overrideStyle={{
                width: "300px",
              }}
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
              overrideStyle={{
                width: "300px",
              }}
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

export default EditTeam;
