import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { NUM_DECIMALS } from "@/shared/constants";
import { Stock } from "../../interfaces";

interface Props {
  rows: Stock[];
}

const StockTableFooter = ({ rows = [] }: Props) => {
  let totalPriceSum = 0;
  let totalQuantity = 0;
  let totalCostSum = 0;

  rows.forEach(({ product, quantity }) => {
    totalPriceSum += (product?.unitPrice ?? 0) * quantity;
    totalCostSum += (product?.unitCost ?? 0) * quantity;
    totalQuantity += quantity;
  });

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

        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          {totalQuantity}
        </TableCell>

        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          ${totalCostSum.toFixed(NUM_DECIMALS)}
        </TableCell>

        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          ${totalPriceSum.toFixed(NUM_DECIMALS)}
        </TableCell>
        <TableCell />
      </TableRow>
    </TableFooter>
  );
};

export { StockTableFooter };
