import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Dispatch } from "react";

import { Customer, GetCustomersResponse } from "@/services/customers/interfaces";
import { getNumRowsToCompleteTablePageSize } from "@/shared/utils";
import { HEADER_COLUMNS } from "../constants";
import { CustomerRow } from "./CustomerRow";
import { NotFound } from "./NotFound";

interface Props extends GetCustomersResponse {
  setSelectedRows: Dispatch<Record<string, Customer>>;
  selectedRows: Record<string, Customer>;
  currentPageNumber: number;
  pageSize: number;
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

    const stockElement = rows.find(({ id }) => id === stockId);

    if (!stockElement) {
      return;
    }

    setSelectedRows({ ...selectedRows, [stockId]: stockElement });
  };

  return (
    <TableBody>
      {rows.map((row: Customer) => (
        <CustomerRow
          isSelected={Boolean(selectedRows[row.id])}
          onClick={() => selectRow(row.id)}
          key={row.id}
          {...row}
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
