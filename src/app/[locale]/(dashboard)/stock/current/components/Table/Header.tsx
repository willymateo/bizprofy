import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, Dispatch } from "react";
import { useTranslations } from "next-intl";

import { CurrentStock } from "@/services/stock/current/interfaces";
import { HEADER_COLUMNS } from "./constants";
import { Order } from "./interfaces";

interface Props {
  setSelectedRows: Dispatch<Record<string, CurrentStock>>;
  handleSort: (propertyId: string) => void;
  numRowsSelected: number;
  orderDirection: Order;
  numTotalRows: number;
  rows: CurrentStock[];
  orderBy: string;
}

const Header = ({
  orderDirection = Order.asc,
  numRowsSelected = 0,
  numTotalRows = 0,
  setSelectedRows,
  handleSort,
  rows = [],
  orderBy,
}: Props) => {
  const t = useTranslations();

  const selectAll = ({ target: { checked = false } }: ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      const newSelectedRows: Record<string, CurrentStock> = {};

      rows.forEach(row => {
        newSelectedRows[row?.product?.id] = row;
      });

      return setSelectedRows(newSelectedRows);
    }

    setSelectedRows({});
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            indeterminate={numRowsSelected > 0 && numRowsSelected < numTotalRows}
            checked={numTotalRows > 0 && numRowsSelected === numTotalRows}
            onChange={selectAll}
          />
        </TableCell>

        {HEADER_COLUMNS.map(({ className = "", id, label = "" }) => (
          <TableCell
            sortDirection={orderBy === id.toString() ? orderDirection : false}
            className={className}
            key={id}
          >
            <TableSortLabel
              direction={orderBy === id.toString() ? orderDirection : "asc"}
              onClick={() => handleSort(id.toString())}
              active={orderBy === id.toString()}
              hideSortIcon
            >
              {t(label)}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export { Header };
