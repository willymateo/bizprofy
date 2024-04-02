import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Dispatch } from "react";

import { NotFound } from "../../../components/Table/SimpleTable/Body/NotFound";
import { getNumRowsToCompleteTablePageSize } from "@/shared/utils";
import { HEADER_COLUMNS } from "../constants";
import { BodyRowData } from "../interfaces";
import { StockRow } from "./StockRow";

interface Props {
  setSelectedRows: Dispatch<Record<string, BodyRowData>>;
  selectedRows: Record<string, BodyRowData>;
  currentPageNumber: number;
  rows: BodyRowData[];
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
        .map((stockElement: BodyRowData) => (
          <StockRow
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

      {!rows.length ? <NotFound numColumns={HEADER_COLUMNS.length + 2} /> : null}
    </TableBody>
  );
};

export { Body };