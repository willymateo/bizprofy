import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { HEADER_COLUMNS } from "../constants";
import Paper from "@mui/material/Paper";

const NotFound = () => (
  <TableRow>
    <TableCell align="center" colSpan={HEADER_COLUMNS.length + 2} className="h-[375px]">
      <Paper sx={{ textAlign: "center" }}>
        <Typography variant="h6" paragraph>
          No customers found
        </Typography>

        <Typography variant="body2">
          We couldn't find any results matching your search criteria.
        </Typography>
      </Paper>
    </TableCell>
  </TableRow>
);

export { NotFound };
