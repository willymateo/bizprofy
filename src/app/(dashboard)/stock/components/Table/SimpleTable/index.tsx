"use client";

import TablePagination from "@mui/material/TablePagination";
import { ChangeEvent, MouseEvent, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Card from "@mui/material/Card";

import { GetStockResponse } from "@/services/stock/interfaces";
import { StockTableFooter } from "./StockTableFooter";
import { StockTableBody } from "./StockTableBody";
import { PAGE_SIZE_OPTIONS } from "./constants";
import { Order } from "@/services/interfaces";
import { Stock } from "../../../interfaces";
import { TableHeader } from "./TableHeader";
import { ToolBar } from "./ToolBar";

const SimpleTable = ({ rows = [], count = 0 }: GetStockResponse) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, Stock>>({});
  const [orderDirection, setOrderDirection] = useState<Order>(Order.asc);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const handleSort = (id: string = "") => {
    const isAsc = orderBy === id && orderDirection === Order.asc;

    if (id) {
      setOrderDirection(isAsc ? Order.desc : Order.asc);
      setOrderBy(id);
    }
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) =>
    setCurrentPageNumber(newPage);

  const handleChangePageSize = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageSize(parseInt(value, 10));
    setCurrentPageNumber(0);
  };

  const handleChangeQuery = ({ target: { value = "" } }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageNumber(0);
    setQuery(value);
  };

  return (
    <Card>
      <ToolBar
        numRowsSelected={Object.keys(selectedRows).length}
        onChangeQuery={handleChangeQuery}
        query={query}
      />

      <TableContainer className="max-h-96">
        <Table stickyHeader>
          <TableHeader
            numRowsSelected={Object.keys(selectedRows).length}
            setSelectedRows={setSelectedRows}
            orderDirection={orderDirection}
            handleSort={handleSort}
            numTotalRows={count}
            orderBy={orderBy}
            rows={rows}
          />

          <StockTableBody
            currentPageNumber={currentPageNumber}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            pageSize={pageSize}
            query={query}
            count={count}
            rows={rows}
          />

          <StockTableFooter rows={rows} />
        </Table>
      </TableContainer>

      <TablePagination
        onRowsPerPageChange={handleChangePageSize}
        rowsPerPageOptions={PAGE_SIZE_OPTIONS}
        onPageChange={handleChangePage}
        page={currentPageNumber}
        rowsPerPage={pageSize}
        component="div"
        count={count}
      />
    </Card>
  );
};

export { SimpleTable };
