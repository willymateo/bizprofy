import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Dispatch } from "react";

import { getNumRowsToCompleteTablePageSize } from "@/shared/utils";
import { CurrentStock } from "@/services/stock/current/interfaces";
import { CurrentStockRow } from "./CurrentStockRow";
import { HEADER_COLUMNS } from "../constants";
import { NotFound } from "./NotFound";

interface Props {
  setSelectedRows: Dispatch<Record<string, CurrentStock>>;
  selectedRows: Record<string, CurrentStock>;
  currentPageNumber: number;
  rows: CurrentStock[];
  pageSize: number;
  count: number;
}

const Body = ({
  currentPageNumber = 0,
  selectedRows = {},
  setSelectedRows,
  pageSize = 0,
  count = 0,
  rows = [],
}: Props) => {
  const numRowsToCompletePageSize = getNumRowsToCompleteTablePageSize({
    numTotalRows: count,
    currentPageNumber,
    pageSize,
  });

  const selectRow = (stockId: string = "") => {
    const isSelected = Boolean(selectedRows[stockId]);

    if (isSelected) {
      const { [stockId]: removed, ...newSelectedRows } = selectedRows;

      return setSelectedRows(newSelectedRows);
    }

    const stockElement = rows.find(({ product }) => product.id === stockId);

    if (!stockElement) {
      return;
    }

    setSelectedRows({ ...selectedRows, [stockId]: stockElement });
  };

  return (
    <TableBody>
      {rows
        .slice(currentPageNumber * pageSize, currentPageNumber * pageSize + pageSize)
        .map(stockElement => (
          <CurrentStockRow
            isSelected={Boolean(selectedRows[stockElement?.product?.id])}
            onClick={() => selectRow(stockElement?.product?.id)}
            key={stockElement?.product?.id}
            {...stockElement}
          />
        ))}

      {[...Array(numRowsToCompletePageSize)].map((_, rowIndex) => (
        <TableRow key={rowIndex} className="h-[75px]">
          {[...Array(HEADER_COLUMNS.length + 2)].map((_, index) => (
            <TableCell key={index} />
          ))}
        </TableRow>
      ))}

      {!rows.length ? <NotFound /> : null}
    </TableBody>
  );
};

export { Body };
