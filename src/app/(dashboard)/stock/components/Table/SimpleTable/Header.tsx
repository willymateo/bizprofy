import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, Dispatch } from "react";

import { HeaderColumnTypes, Order } from "./interfaces";
import { HEADER_COLUMNS } from "./constants";
import { Stock } from "../../../interfaces";

interface Props {
  setSelectedRows: Dispatch<Record<string, Stock>>;
  handleSort: (propertyId: string) => void;
  columns?: HeaderColumnTypes[];
  numRowsSelected: number;
  orderDirection: Order;
  numTotalRows: number;
  orderBy: string;
  rows: Stock[];
}

const Header = ({
  columns = Object.values(HeaderColumnTypes),
  orderDirection = Order.asc,
  numRowsSelected = 0,
  numTotalRows = 0,
  setSelectedRows,
  handleSort,
  rows = [],
  orderBy,
}: Props) => {
  const selectAll = ({ target: { checked = false } }: ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      const newSelectedRows: Record<string, Stock> = {};

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

        {HEADER_COLUMNS.filter(({ id = "" }) => columns.includes(id as HeaderColumnTypes)).map(
          ({ className = "", id = "", label = "" }) => (
            <TableCell
              sortDirection={orderBy === id ? orderDirection : false}
              className={className}
              key={id}
            >
              <TableSortLabel
                direction={orderBy === id ? orderDirection : "asc"}
                onClick={() => handleSort(id)}
                active={orderBy === id}
                hideSortIcon
              >
                {label}
              </TableSortLabel>
            </TableCell>
          ),
        )}

        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export { Header };
