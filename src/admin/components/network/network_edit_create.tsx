import {
  AutocompleteInput,
  Create,
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const NetworkCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="plan_enrollment_id" reference="plan-enrollments">
        <AutocompleteInput optionText="reference_name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const NetworkEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <ReferenceInput source="plan_enrollment_id" reference="plan-enrollments">
        <AutocompleteInput optionText="reference_name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
