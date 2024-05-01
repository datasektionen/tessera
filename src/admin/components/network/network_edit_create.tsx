import { Create, Edit, SimpleForm, TextInput } from "react-admin";

export const NetworkCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const NetworkEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
