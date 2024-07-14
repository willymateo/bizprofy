"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import { useEffect } from "react";

import { resetAllFilters as resetAllCurrentStockFilters } from "@/redux/states/stock/current";
import { resetAllFilters as resetAllStockOutFilters } from "@/redux/states/stock/out";
import { resetAllFilters as resetAllStockInFilters } from "@/redux/states/stock/in";
import { authConfig } from "@/app/api/auth/[...nextauth]/constants";

const Content = () => {
  const t = useTranslations();
  const dispatch = useDispatch();

  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    try {
      await signOut({ callbackUrl: authConfig?.pages?.signIn ?? "/" });

      dispatch(resetAllCurrentStockFilters());
      dispatch(resetAllStockOutFilters());
      dispatch(resetAllStockInFilters());
    } catch (err) {
      console.log("Error signing out", err);
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center gap-10 p-10 z-10 rounded-2xl max-w-md">
      <CircularProgress className="!w-[22px] !h-[22px]" disableShrink color="inherit" />
      {t("Logging out")}
    </Card>
  );
};

export { Content };
