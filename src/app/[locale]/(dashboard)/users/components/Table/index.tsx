"use client";

import TablePagination from "@mui/material/TablePagination";
import { ChangeEvent, MouseEvent, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import { useRouter } from "next/navigation";
import MuiTable from "@mui/material/Table";
import Card from "@mui/material/Card";

import { GetUsersPayload, GetUsersResponse, User } from "@/services/users/interfaces";
import { PAGE_SIZE_OPTIONS } from "./constants";
import { Order } from "./interfaces";
import { ToolBar } from "./ToolBar";
import { Header } from "./Header";
import { Body } from "./Body";

interface Props extends GetUsersPayload, GetUsersResponse {
  className?: string;
}

const Table = ({
  limit = PAGE_SIZE_OPTIONS[0],
  className = "",
  offset = 0,
  count = 0,
  rows = [],
}: Props) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, User>>({});
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
      `/users?${new URLSearchParams({
        offset: (newPage * limit).toString(),
        limit: limit.toString(),
      })}`,
    );

  const handleChangePageSize = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    router.replace(
      `/users?${new URLSearchParams({
        limit: value,
        offset: "0",
      })}`,
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
