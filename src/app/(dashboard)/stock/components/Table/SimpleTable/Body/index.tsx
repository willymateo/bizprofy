import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Dispatch } from "react";

import { getNumRowsToCompleteTablePageSize } from "@/shared/utils";
import { GetStockResponse } from "@/services/stock/interfaces";
import { Stock } from "@/app/(dashboard)/stock/interfaces";
import { HeaderColumnTypes } from "../interfaces";
import { NotFound } from "./NotFound";
import { StockRow } from "./StockRow";

interface Props extends GetStockResponse {
  setSelectedRows: Dispatch<Record<string, Stock>>;
  selectedRows: Record<string, Stock>;
  columns?: HeaderColumnTypes[];
  currentPageNumber: number;
  pageSize: number;
}

const Body = ({
  columns = Object.values(HeaderColumnTypes),
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

    const stockElement = rows.find(({ id }) => id === stockId);

    if (!stockElement) {
      return;
    }

    setSelectedRows({ ...selectedRows, [stockId]: stockElement });
  };

  return (
    <TableBody>
      {rows.map((stockElement: Stock) => (
        <StockRow
          isSelected={Boolean(selectedRows[stockElement.id])}
          onClick={() => selectRow(stockElement.id)}
          key={stockElement.id}
          columns={columns}
          {...stockElement}
        />
      ))}

      {[...Array(numRowsToCompletePageSize)].map((_, rowIndex) => (
        <TableRow key={rowIndex} className="h-[75px]">
          <TableCell />
          {columns.includes(HeaderColumnTypes.productId) && <TableCell />}
          {columns.includes(HeaderColumnTypes.productCode) && <TableCell />}
          {columns.includes(HeaderColumnTypes.productName) && <TableCell />}
          {columns.includes(HeaderColumnTypes.unitCost) && <TableCell />}
          {columns.includes(HeaderColumnTypes.unitPrice) && <TableCell />}
          {columns.includes(HeaderColumnTypes.quantity) && <TableCell />}
          {columns.includes(HeaderColumnTypes.totalCost) && <TableCell />}
          {columns.includes(HeaderColumnTypes.totalPrice) && <TableCell />}
          <TableCell />
        </TableRow>
      ))}

      {!rows.length ? <NotFound numColumns={columns.length + 2} /> : null}
    </TableBody>
  );
};

export { Body };
