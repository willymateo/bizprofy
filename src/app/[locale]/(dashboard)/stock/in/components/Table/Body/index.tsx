import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Dispatch } from "react";

import { GetStockInResponse, StockIn } from "@/services/stock/in/interfaces";
import { getNumRowsToCompleteTablePageSize } from "@/utils/tables";
import { ErrorContent } from "./ErrorContent";
import { HEADER_COLUMNS } from "../constants";
import { StockInRow } from "./StockInRow";
import { NotFound } from "./NotFound";
import { Loading } from "./Loading";

interface Props extends Omit<GetStockInResponse, "summarizedData"> {
  setSelectedRows: Dispatch<Record<string, StockIn>>;
  selectedRows: Record<string, StockIn>;
  currentPageNumber: number;
  error: Error | null;
  isLoading: boolean;
  pageSize: number;
}

const Body = ({
  currentPageNumber = 0,
  selectedRows = {},
  isLoading = false,
  setSelectedRows,
  error = null,
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
      {isLoading ? <Loading /> : null}

      {error ? <ErrorContent /> : null}

      {!isLoading && !error ? (
        <>
          {rows?.map(stockElement => (
            <StockInRow
              isSelected={Boolean(selectedRows[stockElement.id])}
              onClick={() => selectRow(stockElement.id)}
              key={stockElement.id}
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
        </>
      ) : null}
    </TableBody>
  );
};

export { Body };
