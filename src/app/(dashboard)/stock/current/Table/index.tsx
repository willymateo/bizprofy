"use client";

import TablePagination from "@mui/material/TablePagination";
import { ChangeEvent, MouseEvent, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import MuiTable from "@mui/material/Table";
import { useForm } from "react-hook-form";
import Card from "@mui/material/Card";
import dayjs, { Dayjs } from "dayjs";

import { BodyRowData, TableData } from "./interfaces";
import { PAGE_SIZE_OPTIONS } from "./constants";
import { Order } from "@/services/interfaces";
import { ToolBar } from "./ToolBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Body } from "./Body";

interface CurrentStockFormProps {
  transactionDateGreaterThanOrEqualTo: Dayjs;
  transactionDateLessThanOrEqualTo: Dayjs;
  query?: string;
}

interface Props {
  transactionDateGreaterThanOrEqualTo: string;
  transactionDateLessThanOrEqualTo: string;
  tableData: TableData;
}

const Table = ({ tableData, ...props }: Props) => {
  const { control, watch, handleSubmit } = useForm<CurrentStockFormProps>({
    values: {
      transactionDateGreaterThanOrEqualTo: dayjs(props.transactionDateGreaterThanOrEqualTo),
      transactionDateLessThanOrEqualTo: dayjs(props.transactionDateLessThanOrEqualTo),
      query: "",
    },
  });
  const [selectedRows, setSelectedRows] = useState<Record<string, BodyRowData>>({});
  const [orderDirection, setOrderDirection] = useState<Order>(Order.asc);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>("");
  const [q, setQuery] = useState<string>("");

  const transactionDateGreaterThanOrEqualTo = watch("transactionDateGreaterThanOrEqualTo");
  const transactionDateLessThanOrEqualTo = watch("transactionDateLessThanOrEqualTo");
  const query = watch("query");

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
    <Card className="flex flex-col">
      <ToolBar
        transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
        transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
        numRowsSelected={Object.keys(selectedRows).length}
        setCurrentPageNumber={setCurrentPageNumber}
        control={control}
      />

      <TableContainer className="max-h-[35rem]">
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
            query={query}
          />

          <Footer {...(tableData?.footerData ?? {})} />
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
