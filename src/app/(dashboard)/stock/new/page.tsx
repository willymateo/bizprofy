import { redirect } from "next/navigation";
import Card from "@mui/material/Card";
import { Metadata } from "next";

import { Return as ReturnButton } from "@/app/components/Buttons/Return";
import { CreatableStockTypes } from "@/services/stock/interfaces";
import { NewStockForm } from "./components/NewStockForm";
import { TITLE_BY_STOCK_TYPE } from "./constants";
import { STOCK_TYPE_IDS } from "../constants";

const metadata: Metadata = {
  description: "Business management system",
  title: "New stock | Bizprofy",
};

type SearchParams = {
  type: CreatableStockTypes;
};

type Props = {
  searchParams: SearchParams;
  params: {};
};

const NewStock = ({ searchParams }: Props) => {
  const stockType = searchParams.type;
  const stockTypeId = STOCK_TYPE_IDS[stockType];

  if (!Object.values(CreatableStockTypes).includes(stockType)) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>{TITLE_BY_STOCK_TYPE[stockType]}</h1>

        <ReturnButton className="w-fit">Cancel</ReturnButton>
      </div>

      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NewStockForm stockType={stockType} stockTypeId={stockTypeId} />
      </Card>
    </div>
  );
};

export default NewStock;
export { metadata };
