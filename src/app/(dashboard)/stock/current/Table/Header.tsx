import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, Dispatch } from "react";

import { Order } from "../../components/Table/SimpleTable/interfaces";
import { HEADER_COLUMNS } from "./constants";
import { BodyRowData } from "./interfaces";

interface Props {
  setSelectedRows: Dispatch<Record<string, BodyRowData>>;
  handleSort: (propertyId: string) => void;
  numRowsSelected: number;
  orderDirection: Order;
  numTotalRows: number;
  rows: BodyRowData[];
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
  const selectAll = ({ target: { checked = false } }: ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      const newSelectedRows: Record<string, BodyRowData> = {};

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

        {HEADER_COLUMNS.map(({ className = "", id = "", label = "" }) => (
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
        ))}

        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export { Header };
