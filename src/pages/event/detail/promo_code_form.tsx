import { Formik, Form } from 'formik';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next'; // replace with actual import paths
import PALLETTE from '../../../theme/pallette';
import { StyledFormLabel, StyledFormLabelWithHelperText } from '../../../components/forms/form_labels';
import { FormInput } from '../../../components/forms/input_types';
import StyledButton from '../../../components/buttons/styled_button';
import { StyledErrorMessage } from '../../../components/forms/messages';
import { PromoCodeValidationSchema } from '../../../validation/event/create_ticket_release_form';
import { PromoCodeAccessForm, PromoCodeAccessFormInitialValues } from '../../../types';

interface PromoCodeFormProps {
    onSubmit: (values: PromoCodeAccessForm) => void;
}

export const PromoCodeForm: React.FC<PromoCodeFormProps> = ({ onSubmit }) => {
    const { t } = useTranslation();

    return (
        <Formik
            initialValues={PromoCodeAccessFormInitialValues}
            onSubmit={(values: PromoCodeAccessForm, actions) => {
                onSubmit(values);
                // Clear
                actions.resetForm();
            }}
            validationSchema={PromoCodeValidationSchema}
        >
            {({ handleChange, setFieldValue }) => (
                <Form>
                    <StyledFormLabel>
                        {t("event.promo_code_title")}
                    </StyledFormLabel>

                    <Stack spacing={2} sx={{ p: 0 }} direction="row">
                        <FormInput
                            label={t("event.promo_code_title")}
                            name={"promo_code"}
                            placeholder={"Enter Promo Code"}
                            type={"text"}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const { value } = event.currentTarget;
                                setFieldValue("promo_code", value.toUpperCase());
                            }}
                        />

                        <StyledButton
                            type="submit"
                            size="md"
                            color={PALLETTE.charcoal}
                        >
                            {t("form.button_submit")}
                        </StyledButton>
                    </Stack>
                    <StyledErrorMessage name="promo_code" />

                    <StyledFormLabelWithHelperText>
                        {t("event.promo_code_helperText")}
                    </StyledFormLabelWithHelperText>
                </Form>
            )}
        </Formik>
    );
};