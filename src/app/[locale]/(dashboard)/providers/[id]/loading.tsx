import Skeleton from "@mui/material/Skeleton";

import { Layout } from "./components/Layout";

const Loading = () => (
  <Layout>
    <Skeleton variant="rectangular" className="w-full h-[648px] rounded-2xl" />
  </Layout>
);

export default Loading;
