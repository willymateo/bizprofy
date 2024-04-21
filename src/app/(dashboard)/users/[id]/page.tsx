import Card from "@mui/material/Card";

import { EditUserForm } from "./components/EditUserForm";
import { getUserById } from "@/services/users";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditUser = async ({ params: { id = "" } }: Props) => {
  const user = await getUserById({ id });

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <EditUserForm {...user} />
    </Card>
  );
};

export default EditUser;
