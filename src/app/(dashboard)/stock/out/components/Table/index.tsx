"use client";

import TablePagination from "@mui/material/TablePagination";
import { ChangeEvent, MouseEvent, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import { useRouter } from "next/navigation";
import MuiTable from "@mui/material/Table";
import Card from "@mui/material/Card";

import { GetStockOutPayload, StockOut } from "@/services/stock/out/interfaces";
import { Order, TableData } from "./interfaces";
import { PAGE_SIZE_OPTIONS } from "./constants";
import { ToolBar } from "./ToolBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Body } from "./Body";

interface Props extends TableData, GetStockOutPayload {
  transactionDateGreaterThanOrEqualTo: string;
  transactionDateLessThanOrEqualTo: string;
  className?: string;
  href: string;
}

const Table = ({
  transactionDateGreaterThanOrEqualTo,
  transactionDateLessThanOrEqualTo,
  limit = PAGE_SIZE_OPTIONS[0],
  className = "",
  footerData,
  offset = 0,
  count = 0,
  bodyData,
  href,
}: Props) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, StockOut>>({});
  const [orderDirection, setOrderDirection] = useState<Order>(Order.asc);
  const [orderBy, setOrderBy] = useState<string>("");
  const router = useRouter();

  const handleSort = (id: string = "") => {
    const isAsc = orderBy === id && orderDirection === Order.asc;

    if (id) {
      setOrderDirection(isAsc ? Order.desc : Order.asc);
      setOrderBy(id);
    }
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) =>
    router.replace(
      `${href}?${new URLSearchParams({
        offset: (newPage * limit).toString(),
        transactionDateGreaterThanOrEqualTo,
        transactionDateLessThanOrEqualTo,
        limit: limit.toString(),
      }).toString()}`,
    );

  const handleChangePageSize = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    router.replace(
      `${href}?${new URLSearchParams({
        transactionDateGreaterThanOrEqualTo,
        transactionDateLessThanOrEqualTo,
        limit: value,
        offset: "0",
      }).toString()}`,
    );

  return (
    <Card className={`flex flex-col ${className}`}>
      <ToolBar
        transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
        transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
        numRowsSelected={Object.keys(selectedRows).length}
        href={href}
      />

      <TableContainer className="max-h-[35rem]">
        <MuiTable stickyHeader>
          <Header
            numRowsSelected={Object.keys(selectedRows).length}
            setSelectedRows={setSelectedRows}
            orderDirection={orderDirection}
            handleSort={handleSort}
            numTotalRows={count}
            orderBy={orderBy}
            rows={bodyData}
          />

          <Body
            setSelectedRows={setSelectedRows}
            currentPageNumber={offset / limit}
            selectedRows={selectedRows}
            pageSize={limit}
            rows={bodyData}
            count={count}
          />

          {bodyData.length ? <Footer {...footerData} /> : null}
        </MuiTable>
      </TableContainer>

      <TablePagination
        onRowsPerPageChange={handleChangePageSize}
        rowsPerPageOptions={PAGE_SIZE_OPTIONS}
        onPageChange={handleChangePage}
        page={offset / limit}
        rowsPerPage={limit}
        component="div"
        count={count}
      />
    </Card>
  );
};

export { Table };
