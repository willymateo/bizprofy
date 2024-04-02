import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { NUM_DECIMALS } from "@/shared/constants";
import { FooterData } from "./interfaces";

const Footer = ({ totalQuantity = 0, totalPriceSum = 0 }: FooterData) => (
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
        ${totalPriceSum.toFixed(NUM_DECIMALS)}
      </TableCell>
      <TableCell />
    </TableRow>
  </TableFooter>
);

export { Footer };
