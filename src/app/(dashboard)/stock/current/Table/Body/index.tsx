import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { getNumRowsToCompletePageSize } from "../../../components/Table/utils";
import { HEADER_COLUMNS } from "../constants";
import { BodyRowData } from "../interfaces";
import { NotFound } from "./NotFound";
import { StockRow } from "./StockRow";
import { Dispatch } from "react";

interface Props {
  setSelectedRows: Dispatch<Record<string, BodyRowData>>;
  selectedRows: Record<string, BodyRowData>;
  currentPageNumber: number;
  rows: BodyRowData[];
  pageSize: number;
  query?: string;
  count: number;
}

const Body = ({
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
        .map((stockElement: BodyRowData) => (
          <StockRow
            isSelected={Boolean(selectedRows[stockElement?.product?.id])}
            onClick={() => selectRow(stockElement?.product?.id)}
            key={stockElement?.product?.id}
            {...stockElement}
          />
        ))}

      {[...Array(numRowsToCompletePageSize)].map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {[...Array(HEADER_COLUMNS.length + 2)].map((_, index) => (
            <TableCell key={index} />
          ))}
        </TableRow>
      ))}

      {queryNotFound && <NotFound query={query} />}
    </TableBody>
  );
};

export { Body };
