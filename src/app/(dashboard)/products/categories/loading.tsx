import Skeleton from "@mui/material/Skeleton";

import { Layout } from "../components/Layout";

const Loading = () => (
  <Layout>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-5">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" className="rounded-2xl h-[122px] w-full" />
      ))}
    </div>
  </Layout>
);

export default Loading;
