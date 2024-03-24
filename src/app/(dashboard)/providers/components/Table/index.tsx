"use client";

import TablePagination from "@mui/material/TablePagination";
import { ChangeEvent, MouseEvent, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import { useRouter } from "next/navigation";
import MuiTable from "@mui/material/Table";
import Card from "@mui/material/Card";

import { PAGE_SIZE_OPTIONS } from "./constants";
import {
  GetProvidersResponse,
  GetProvidersPayload,
  Provider,
} from "@/services/providers/interfaces";
import { Order } from "./interfaces";
import { ToolBar } from "./ToolBar";
import { Header } from "./Header";
import { Body } from "./Body";

interface Props extends GetProvidersPayload, GetProvidersResponse {
  className?: string;
}

const Table = ({
  limit = PAGE_SIZE_OPTIONS[0],
  className = "",
  offset = 0,
  count = 0,
  rows = [],
}: Props) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, Provider>>({});
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
      `/providers?${new URLSearchParams({
        offset: (newPage * limit).toString(),
        limit: limit.toString(),
      }).toString()}`,
    );

  const handleChangePageSize = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    router.replace(
      `/providers?${new URLSearchParams({
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
      <ToolBar numRowsSelected={Object.keys(selectedRows).length} offset={offset} limit={limit} />

      <TableContainer className="max-h-[35rem]">
        <MuiTable stickyHeader>
          <Header
            numRowsSelected={Object.keys(selectedRows).length}
            setSelectedRows={setSelectedRows}
            orderDirection={orderDirection}
            handleSort={handleSort}
            numTotalRows={count}
            orderBy={orderBy}
            rows={rows}
          />

          <Body
            setSelectedRows={setSelectedRows}
            currentPageNumber={offset / limit}
            selectedRows={selectedRows}
            pageSize={limit}
            count={count}
            rows={rows}
          />
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
