import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  TextField,
} from "react-admin";

export const NetworkList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
