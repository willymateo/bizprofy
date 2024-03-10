import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { FooterData, HeaderColumnTypes } from "./interfaces";
import { NUM_DECIMALS } from "@/shared/constants";

interface Props extends Partial<FooterData> {
  columns?: HeaderColumnTypes[];
}

const Footer = ({
  columns = Object.values(HeaderColumnTypes),
  totalQuantity = 0,
  totalPriceSum = 0,
  totalCostSum = 0,
}: Props) => (
  <TableFooter className="sticky bottom-0 bg-white">
    <TableRow>
      <TableCell className="font-bold text-right whitespace-nowrap sticky left-0 text-lg">
        Total
      </TableCell>

      {columns.includes(HeaderColumnTypes.transactionDate) && <TableCell />}
      {columns.includes(HeaderColumnTypes.productId) && <TableCell />}
      {columns.includes(HeaderColumnTypes.productCode) && <TableCell />}
      {columns.includes(HeaderColumnTypes.productName) && <TableCell />}
      {columns.includes(HeaderColumnTypes.unitCost) && <TableCell />}
      {columns.includes(HeaderColumnTypes.unitPrice) && <TableCell />}

      {columns.includes(HeaderColumnTypes.quantity) && (
        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          {totalQuantity}
        </TableCell>
      )}

      {columns.includes(HeaderColumnTypes.totalCost) && (
        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          ${totalCostSum.toFixed(NUM_DECIMALS)}
        </TableCell>
      )}

      {columns.includes(HeaderColumnTypes.totalPrice) && (
        <TableCell className="font-bold text-right whitespace-nowrap text-lg">
          ${totalPriceSum.toFixed(NUM_DECIMALS)}
        </TableCell>
      )}
      <TableCell />
    </TableRow>
  </TableFooter>
);

export { Footer };
