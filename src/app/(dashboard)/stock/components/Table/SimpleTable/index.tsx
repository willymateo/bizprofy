"use client";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Card from "@mui/material/Card";

import { GetStockResponse } from "@/services/stock/interfaces";
import { HeaderColumnTypes, TableData } from "./interfaces";
import { PAGE_SIZE_OPTIONS } from "./constants";
import { Order } from "@/services/interfaces";
import { Stock } from "../../../interfaces";
import { getTableData } from "./utils";
import { ToolBar } from "./ToolBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Body } from "./Body";

interface Props extends GetStockResponse {
  columns?: HeaderColumnTypes[];
  className?: string;
}

const SimpleTable = ({
  columns = Object.values(HeaderColumnTypes),
  rows: originalRows = [],
  className = "",
  count = 0,
}: Props) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, Stock>>({});
  const [orderDirection, setOrderDirection] = useState<Order>(Order.asc);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [orderBy, setOrderBy] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const newTableData = getTableData({ rows: originalRows });
    setTableData(newTableData);
  }, [originalRows]);

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
    <Card className={`flex flex-col ${className}`}>
      <ToolBar
        numRowsSelected={Object.keys(selectedRows).length}
        onChangeQuery={handleChangeQuery}
        query={query}
      />

      <TableContainer className="max-h-[35rem]">
        <Table stickyHeader>
          <Header
            numRowsSelected={Object.keys(selectedRows).length}
            rows={tableData?.bodyRowData ?? []}
            setSelectedRows={setSelectedRows}
            orderDirection={orderDirection}
            handleSort={handleSort}
            numTotalRows={count}
            columns={columns}
            orderBy={orderBy}
          />

          <Body
            currentPageNumber={currentPageNumber}
            rows={tableData?.bodyRowData ?? []}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            pageSize={pageSize}
            columns={columns}
            query={query}
            count={count}
          />

          <Footer {...(tableData?.footerData ?? {})} columns={columns} />
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
