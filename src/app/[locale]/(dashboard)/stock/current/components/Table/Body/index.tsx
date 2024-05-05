import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Dispatch } from "react";

import { CurrentStock, GetCurrentStockResponse } from "@/services/stock/current/interfaces";
import { getNumRowsToCompleteTablePageSize } from "@/shared/utils";
import { CurrentStockRow } from "./CurrentStockRow";
import { HEADER_COLUMNS } from "../constants";
import { ErrorContent } from "./ErrorContent";
import { NotFound } from "./NotFound";
import { Loading } from "./Loading";

interface Props extends Omit<GetCurrentStockResponse, "summarizedData"> {
  setSelectedRows: Dispatch<Record<string, CurrentStock>>;
  selectedRows: Record<string, CurrentStock>;
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

    const stockElement = rows.find(({ product }) => product.id === stockId);

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
        </>
      ) : null}
    </TableBody>
  );
};

export { Body };
