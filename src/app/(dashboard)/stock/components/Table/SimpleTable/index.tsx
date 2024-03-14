"use client";

import TablePagination from "@mui/material/TablePagination";
import { ChangeEvent, MouseEvent, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import Card from "@mui/material/Card";

import { HeaderColumnTypes, Order, TableData } from "./interfaces";
import { GetStockPayload } from "@/services/stock/interfaces";
import { PAGE_SIZE_OPTIONS } from "./constants";
import { Stock } from "../../../interfaces";
import { ToolBar } from "./ToolBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Body } from "./Body";

interface Props extends TableData, GetStockPayload {
  transactionDateGreaterThanOrEqualTo: string;
  transactionDateLessThanOrEqualTo: string;
  columns?: HeaderColumnTypes[];
  className?: string;
  href: string;
}

const SimpleTable = ({
  columns = Object.values(HeaderColumnTypes),
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
  const [selectedRows, setSelectedRows] = useState<Record<string, Stock>>({});
  const [orderDirection, setOrderDirection] = useState<Order>(Order.asc);
  const [orderBy, setOrderBy] = useState<string>("");
  const [query, setQuery] = useState<string>("");
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

  const handleChangeQuery = ({ target: { value = "" } }: ChangeEvent<HTMLInputElement>) => {
    // setCurrentPageNumber(0);
    setQuery(value);
  };

  return (
    <Card className={`flex flex-col ${className}`}>
      <ToolBar
        transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
        transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
        numRowsSelected={Object.keys(selectedRows).length}
        offset={offset}
        limit={limit}
        href={href}
      />

      <TableContainer className="max-h-[35rem]">
        <Table stickyHeader>
          <Header
            numRowsSelected={Object.keys(selectedRows).length}
            setSelectedRows={setSelectedRows}
            orderDirection={orderDirection}
            handleSort={handleSort}
            numTotalRows={count}
            columns={columns}
            orderBy={orderBy}
            rows={bodyData}
          />

          <Body
            setSelectedRows={setSelectedRows}
            currentPageNumber={offset / limit}
            selectedRows={selectedRows}
            pageSize={limit}
            columns={columns}
            rows={bodyData}
            query={query}
            count={count}
          />

          <Footer {...footerData} columns={columns} />
        </Table>
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

export { SimpleTable };
