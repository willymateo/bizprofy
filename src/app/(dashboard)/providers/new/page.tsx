import Card from "@mui/material/Card";

import { NewProviderForm } from "./components/NewProviderForm";

const NewProvider = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <NewProviderForm />
  </Card>
);

export default NewProvider;
