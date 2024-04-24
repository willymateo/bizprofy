import Card from "@mui/material/Card";

import { EditProviderForm } from "./components/EditProviderForm";
import { getProviderById } from "@/services/providers";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditProvider = async ({ params: { id = "" } }: Props) => {
  const provider = await getProviderById({ id });

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <EditProviderForm {...provider} />
    </Card>
  );
};

export default EditProvider;
