import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";

import { HEADER_COLUMNS, PAGE_SIZE_OPTIONS } from "../constants";

const Loading = () =>
  [...Array(PAGE_SIZE_OPTIONS[0])].map((_, index) => (
    <TableRow key={index} className="h-[75px]">
      <TableCell align="center" colSpan={HEADER_COLUMNS.length + 2}>
        <Skeleton variant="rectangular" className="w-full h-[40px]" />
      </TableCell>
    </TableRow>
  ));

export { Loading };
