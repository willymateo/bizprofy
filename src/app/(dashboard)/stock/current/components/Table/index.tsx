"use client";

import TablePagination from "@mui/material/TablePagination";
import { ChangeEvent, MouseEvent, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import MuiTable from "@mui/material/Table";
import Card from "@mui/material/Card";

import { BodyRowData, Order, TableData } from "./interfaces";
import { PAGE_SIZE_OPTIONS } from "./constants";
import { ToolBar } from "./ToolBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Body } from "./Body";

interface Props {
  transactionDateGreaterThanOrEqualTo: string;
  transactionDateLessThanOrEqualTo: string;
  tableData: TableData;
  href: string;
}

const Table = ({
  transactionDateGreaterThanOrEqualTo,
  transactionDateLessThanOrEqualTo,
  tableData,
  href,
}: Props) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, BodyRowData>>({});
  const [orderDirection, setOrderDirection] = useState<Order>(Order.asc);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>("");

  const handleSort = (id: string = "") => {
    const isAsc = orderBy === id && orderDirection === Order.asc;

    if (id) {
      setOrderDirection(isAsc ? Order.desc : Order.asc);
      setOrderBy(id);
    }
  };

  const handleChangePageSize = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageSize(parseInt(value, 10));
    setCurrentPageNumber(0);
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) =>
    setCurrentPageNumber(newPage);

  return (
    <Card className="flex flex-col">
      <ToolBar
        transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
        transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
        numRowsSelected={Object.keys(selectedRows).length}
        href={href}
      />

      <TableContainer className="max-h-[31rem]">
        <MuiTable stickyHeader>
          <Header
            numTotalRows={tableData?.bodyRowData?.length ?? 0}
            numRowsSelected={Object.keys(selectedRows).length}
            rows={tableData?.bodyRowData ?? []}
            setSelectedRows={setSelectedRows}
            orderDirection={orderDirection}
            handleSort={handleSort}
            orderBy={orderBy}
          />

          <Body
            count={tableData?.bodyRowData?.length ?? 0}
            currentPageNumber={currentPageNumber}
            rows={tableData?.bodyRowData ?? []}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            pageSize={pageSize}
          />

          {tableData?.bodyRowData?.length ? <Footer {...(tableData?.footerData ?? {})} /> : null}
        </MuiTable>
      </TableContainer>

      <TablePagination
        count={tableData?.bodyRowData?.length ?? 0}
        onRowsPerPageChange={handleChangePageSize}
        rowsPerPageOptions={PAGE_SIZE_OPTIONS}
        onPageChange={handleChangePage}
        page={currentPageNumber}
        rowsPerPage={pageSize}
        component="div"
      />
    </Card>
  );
};

export { Table };
