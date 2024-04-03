import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { NUM_DECIMALS } from "@/shared/constants";
import { getProfitClassName } from "./utils";
import { FooterData } from "./interfaces";

const Footer = ({
  totalPurchasesNumber = 0,
  totalSalesNumber = 0,
  totalPriceSum = 0,
  totalCostSum = 0,
  profit = 0,
}: Partial<FooterData>) => (
  <TableFooter className="sticky bottom-0 bg-white">
    <TableRow>
      <TableCell className="font-bold text-right whitespace-nowrap sticky left-0 text-lg bg-white">
        Total
      </TableCell>

      <TableCell />

      <TableCell />

      <TableCell />

      <TableCell className="font-bold text-right whitespace-nowrap text-lg">
        {totalPurchasesNumber}
      </TableCell>

      <TableCell />

      <TableCell className="font-bold text-right whitespace-nowrap text-lg">
        ${totalCostSum.toFixed(NUM_DECIMALS)}
      </TableCell>

      <TableCell className="font-bold text-right whitespace-nowrap text-lg">
        {totalSalesNumber}
      </TableCell>

      <TableCell />

      <TableCell className="font-bold text-right whitespace-nowrap text-lg">
        ${totalPriceSum.toFixed(NUM_DECIMALS)}
      </TableCell>
      <TableCell />
    </TableRow>

    <TableRow>
      <TableCell className="font-bold text-right whitespace-nowrap sticky left-0 text-lg bg-white">
        Profit
      </TableCell>
      <TableCell />
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
        ${profit.toFixed(NUM_DECIMALS)}
      </TableCell>
      <TableCell />
    </TableRow>
  </TableFooter>
);

export { Footer };
