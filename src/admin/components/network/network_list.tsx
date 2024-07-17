import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  ReferenceField,
  TextField,
} from "react-admin";

export const NetworkList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="plan_enrollment_id" reference="plan-enrollments">
        <TextField source="reference_name" />
      </ReferenceField>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
