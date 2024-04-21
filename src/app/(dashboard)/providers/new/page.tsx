import Card from "@mui/material/Card";

import { ProviderForm } from "../components/ProviderForm";
import { createProvider } from "@/services/providers";

const NewProvider = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <ProviderForm onSave={createProvider} saveButtonLabel="Create provider" />
  </Card>
);

export default NewProvider;
