import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import { useTranslations } from "next-intl";

import { SummarizedCurrentStockData } from "@/services/stock/current/interfaces";
import { NUM_DECIMALS } from "@/shared/constants";
import { getProfitClassName } from "./utils";
import { HEADER_COLUMNS } from "./constants";

type Props = SummarizedCurrentStockData & {
  isLoading?: boolean;
};

const Footer = ({
  totalPurchasesNumber = 0,
  totalCurrentStock = 0,
  totalSalesNumber = 0,
  totalPriceSum = 0,
  isLoading = false,
  totalCostSum = 0,
  profit = 0,
}: Props) => {
  const t = useTranslations();

  if (isLoading) {
    return (
      <TableFooter className="sticky bottom-0 bg-white">
        {[...Array(2)].map((_, index) => (
          <TableRow className="h-[61px]" key={index}>
            <TableCell align="center" colSpan={HEADER_COLUMNS.length + 2}>
              <Skeleton variant="rectangular" className="w-full h-[28px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableFooter>
    );
  }

  return (
    <TableFooter className="sticky bottom-0 bg-white">
      <TableRow>
        <TableCell className="font-bold whitespace-nowrap sticky left-0 text-lg bg-white">
          {t("Total")}
        </TableCell>

        <TableCell />
        <TableCell />

        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          {totalCurrentStock ?? 0}
        </TableCell>

        <TableCell />

        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          {totalPurchasesNumber ?? 0}
        </TableCell>

        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          ${totalCostSum?.toFixed(NUM_DECIMALS) ?? "0.00"}
        </TableCell>

        <TableCell />

        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          {totalSalesNumber ?? 0}
        </TableCell>

        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          ${totalPriceSum?.toFixed(NUM_DECIMALS) ?? "0.00"}
        </TableCell>
        <TableCell />
      </TableRow>

      <TableRow>
        <TableCell className="font-bold whitespace-nowrap sticky left-0 text-lg bg-white">
          {t("Profit")}
        </TableCell>

        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />

        <TableCell
          className={`font-bold text-right whitespace-nowrap text-lg sticky right-0 ${getProfitClassName({ profit })}`}
        >
          ${profit?.toFixed(NUM_DECIMALS) ?? "0.00"}
        </TableCell>
        <TableCell />
      </TableRow>
    </TableFooter>
  );
};

export { Footer };
