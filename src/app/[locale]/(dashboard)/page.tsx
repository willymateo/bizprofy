"use server";

import { getTranslations } from "next-intl/server";

import { Financial } from "./components/Metrics/Financial";
import { getUserSession } from "@/utils/auth";

const Home = async () => {
  const userSession = await getUserSession();
  const t = await getTranslations("Home");

  return (
    <div className="flex flex-col gap-5 h-full">
      <h1>{`${t("Hi")} ${userSession?.firstNames}`}</h1>

      <div className="flex flex-col gap-5">
        <Financial />
      </div>
    </div>
  );
};

export default Home;
