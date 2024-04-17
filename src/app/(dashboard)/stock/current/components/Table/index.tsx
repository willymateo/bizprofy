"use client";

import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import MuiTable from "@mui/material/Table";
import Card from "@mui/material/Card";
import dayjs from "dayjs";

import { CurrentStock, GetCurrentStockResponse } from "@/services/stock/current/interfaces";
import { setFiltersByWarehoseId } from "@/redux/states/stock/current";
import { Warehouse } from "@/services/warehouses/interfaces";
import { getCurrentStock } from "@/services/stock/current";
import { PAGE_SIZE_OPTIONS } from "./constants";
import { useActive } from "@/hooks/useActive";
import { Store } from "@/redux/types";
import { Order } from "./interfaces";
import { ToolBar } from "./ToolBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Body } from "./Body";

type Props = {
  warehouse: Warehouse;
  className?: string;
};

const Table = ({ className = "", warehouse }: Props) => {
  const limit = useSelector(
    (state: Store) =>
      state?.currentStock?.filters?.[warehouse?.id ?? ""]?.limit ?? PAGE_SIZE_OPTIONS[0],
  );
  const transactionDateGreaterThanOrEqualTo = useSelector(
    (state: Store) =>
      state?.currentStock?.filters?.[warehouse?.id ?? ""]?.transactionDateGreaterThanOrEqualTo ||
      dayjs().startOf("day").toISOString(),
  );
  const transactionDateLessThanOrEqualTo = useSelector(
    (state: Store) =>
      state?.currentStock?.filters?.[warehouse?.id ?? ""]?.transactionDateLessThanOrEqualTo ||
      dayjs().endOf("day").toISOString(),
  );
  const offset = useSelector(
    (state: Store) => state?.currentStock?.filters?.[warehouse?.id ?? ""]?.offset ?? 0,
  );

  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [selectedRows, setSelectedRows] = useState<Record<string, CurrentStock>>({});
  const [orderDirection, setOrderDirection] = useState<Order>(Order.asc);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<GetCurrentStockResponse>({
    summarizedData: {
      totalPurchasesNumber: 0,
      totalCurrentStock: 0,
      totalSalesNumber: 0,
      totalPriceSum: 0,
      totalCostSum: 0,
      profit: 0,
    },
    count: 0,
    rows: [],
  });
  const [orderBy, setOrderBy] = useState<string>("");
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setError(null);
    startLoading();

    try {
      const transactionDateGreaterThanOrEqualToDate = dayjs(transactionDateGreaterThanOrEqualTo);
      const transactionDateLessThanOrEqualToDate = dayjs(transactionDateLessThanOrEqualTo);

      if (
        !transactionDateGreaterThanOrEqualToDate?.isValid() ||
        !transactionDateLessThanOrEqualToDate?.isValid() ||
        transactionDateGreaterThanOrEqualToDate.isAfter(transactionDateLessThanOrEqualToDate)
      ) {
        return dispatch(
          setFiltersByWarehoseId({
            warehouseId: warehouse.id,
            filters: {
              transactionDateGreaterThanOrEqualTo: dayjs().startOf("day").toISOString(),
              transactionDateLessThanOrEqualTo: dayjs().endOf("day").toISOString(),
            },
          }),
        );
      }

      const stockData = await getCurrentStock({
        transactionDateGreaterThanOrEqualTo,
        transactionDateLessThanOrEqualTo,
        warehouseIds: [warehouse.id],
        offset,
        limit,
      });

      setData(stockData);
    } catch (err) {
      console.error("Error fetching current stock data", err);

      setError(err as Error);
    }

    stopLoading();
  }, [
    transactionDateGreaterThanOrEqualTo,
    transactionDateLessThanOrEqualTo,
    warehouse.id,
    offset,
    limit,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSort = (id: string = "") => {
    const isAsc = orderBy === id && orderDirection === Order.asc;

    if (id) {
      setOrderDirection(isAsc ? Order.desc : Order.asc);
      setOrderBy(id);
    }
  };

  const handleChangePage = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) =>
    dispatch(
      setFiltersByWarehoseId({
        warehouseId: warehouse.id,
        filters: {
          offset: newPage * limit,
          limit,
        },
      }),
    );

  const handleChangePageSize = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(
      setFiltersByWarehoseId({
        warehouseId: warehouse.id,
        filters: {
          limit: value,
          offset: 0,
        },
      }),
    );

  return (
    <Card className={`flex flex-col ${className}`}>
      <ToolBar numRowsSelected={Object.keys(selectedRows).length} warehouse={warehouse} />

      <TableContainer className="max-h-[580px]">
        <MuiTable stickyHeader>
          <Header
            numRowsSelected={Object.keys(selectedRows ?? {}).length ?? 0}
            setSelectedRows={setSelectedRows}
            orderDirection={orderDirection}
            numTotalRows={data?.count ?? 0}
            handleSort={handleSort}
            rows={data?.rows ?? []}
            orderBy={orderBy}
          />

          <Body
            currentPageNumber={offset / limit}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            count={data?.count ?? 0}
            rows={data?.rows ?? []}
            isLoading={isLoading}
            pageSize={limit}
            error={error}
          />

          {isLoading || data?.rows?.length ? (
            <Footer {...(data?.summarizedData ?? {})} isLoading={isLoading} />
          ) : null}
        </MuiTable>
      </TableContainer>

      <TablePagination
        onRowsPerPageChange={handleChangePageSize}
        rowsPerPageOptions={PAGE_SIZE_OPTIONS}
        onPageChange={handleChangePage}
        count={data?.count ?? 0}
        page={offset / limit}
        rowsPerPage={limit}
        component="div"
      />
    </Card>
  );
};

export { Table };
