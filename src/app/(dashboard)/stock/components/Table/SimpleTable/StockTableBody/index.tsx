import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { GetStockResponse } from "@/services/stock/interfaces";
import { Stock } from "@/app/(dashboard)/stock/interfaces";
import { getNumRowsToCompletePageSize } from "../utils";
import { HEADER_COLUMNS } from "../constants";
import { NotFound } from "./NotFound";
import { StockRow } from "./StockRow";
import { Dispatch } from "react";

interface Props extends GetStockResponse {
  setSelectedRows: Dispatch<Record<string, Stock>>;
  selectedRows: Record<string, Stock>;
  currentPageNumber: number;
  pageSize: number;
  query: string;
}

const StockTableBody = ({
  currentPageNumber = 0,
  selectedRows = {},
  setSelectedRows,
  pageSize = 0,
  query = "",
  count = 0,
  rows = [],
}: Props) => {
  const queryNotFound = query.length > 0 && !rows.length;

  const numRowsToCompletePageSize = getNumRowsToCompletePageSize({
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

    const stockElement = rows.find(({ id }) => id === stockId);

    if (!stockElement) {
      return;
    }

    setSelectedRows({ ...selectedRows, [stockId]: stockElement });
  };

  return (
    <TableBody>
      {rows
        .slice(currentPageNumber * pageSize, currentPageNumber * pageSize + pageSize)
        .map((stockElement: Stock) => (
          <StockRow
            isSelected={Boolean(selectedRows[stockElement.id])}
            onClick={() => selectRow(stockElement.id)}
            key={stockElement.id}
            {...stockElement}
          />
        ))}

      {[...Array(numRowsToCompletePageSize)].map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {[...Array(HEADER_COLUMNS.length + 2)].map((_, colIndex) => (
            <TableCell key={colIndex} />
          ))}
        </TableRow>
      ))}

      {queryNotFound && <NotFound query={query} />}
    </TableBody>
  );
};

export { StockTableBody };
