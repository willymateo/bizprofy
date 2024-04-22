import Card from "@mui/material/Card";

import { UserForm } from "../components/UserForm";
import { createUser } from "@/services/users";

const NewUser = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <UserForm onSave={createUser} saveButtonLabel="Create user" isPasswordRequired />
  </Card>
);

export default NewUser;
