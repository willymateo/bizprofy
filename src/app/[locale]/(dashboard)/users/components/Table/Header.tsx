import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, Dispatch } from "react";
import { useTranslations } from "next-intl";

import { User } from "@/services/users/interfaces";
import { HEADER_COLUMNS } from "./constants";
import { Order } from "./interfaces";

interface Props {
  setSelectedRows: Dispatch<Record<string, User>>;
  handleSort: (propertyId: string) => void;
  numRowsSelected: number;
  orderDirection: Order;
  numTotalRows: number;
  orderBy: string;
  rows: User[];
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
      const newSelectedRows: Record<string, User> = {};

      rows.forEach(row => {
        newSelectedRows[row.id] = row;
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
              direction={orderBy === id.toString() ? orderDirection : Order.asc}
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
