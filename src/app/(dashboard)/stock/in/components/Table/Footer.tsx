import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { SummarizedStockInData } from "@/services/stock/in/interfaces";
import { NUM_DECIMALS } from "@/shared/constants";

const Footer = ({ totalQuantity = 0, totalCostSum = 0 }: SummarizedStockInData) => (
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

      <TableCell />
    </TableRow>
  </TableFooter>
);

export { Footer };
