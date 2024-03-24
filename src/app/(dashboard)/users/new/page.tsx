import Card from "@mui/material/Card";

import { NewUserForm } from "./components/NewUserForm";

const NewUser = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <NewUserForm />
  </Card>
);

export default NewUser;
