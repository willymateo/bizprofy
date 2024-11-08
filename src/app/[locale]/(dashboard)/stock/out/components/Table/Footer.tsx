import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";

import { SummarizedStockOutData } from "@/services/stock/out/interfaces";
import { HEADER_COLUMNS } from "./constants";
import { NUM_DECIMALS } from "@/constants";

type Props = SummarizedStockOutData & {
  isLoading?: boolean;
};

const Footer = ({ totalQuantity = 0, totalPriceSum = 0, isLoading = false }: Props) => {
  if (isLoading) {
    return (
      <TableFooter className="sticky bottom-0 bg-white">
        <TableRow className="h-[61px]">
          <TableCell align="center" colSpan={HEADER_COLUMNS.length + 2}>
            <Skeleton variant="rectangular" className="w-full h-[28px]" />
          </TableCell>
        </TableRow>
      </TableFooter>
    );
  }

  return (
    <TableFooter className="sticky bottom-0 bg-white">
      <TableRow>
        <TableCell className="font-bold text-right whitespace-nowrap sticky left-0 text-lg">
          Total
        </TableCell>

        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />

        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          {totalQuantity}
        </TableCell>
        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          ${totalPriceSum?.toFixed(NUM_DECIMALS) ?? "0.00"}
        </TableCell>

        <TableCell />
      </TableRow>
    </TableFooter>
  );
};

export { Footer };
