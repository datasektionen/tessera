// src/components/featureGroups/FeatureGroupCreate.tsx
import { Create, Edit, SimpleForm, TextInput } from "react-admin";

export const FeatureGroupCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" multiline />
    </SimpleForm>
  </Create>
);

export const FeatureGroupEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="description" multiline />
    </SimpleForm>
  </Edit>
);
