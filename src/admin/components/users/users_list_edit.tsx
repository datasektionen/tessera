import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  DateInput,
} from "react-admin";

export const UserList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="email" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" />
      <TextInput source="phone_number" />
      <BooleanInput source="verified_email" />
      <DateInput disabled source="created_at" />
      <DateInput disabled source="updated_at" />
    </SimpleForm>
  </Edit>
);
