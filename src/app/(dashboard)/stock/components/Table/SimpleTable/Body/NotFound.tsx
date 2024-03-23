import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Props {
  numColumns: number;
}

const NotFound = ({ numColumns }: Props) => (
  <TableRow>
    <TableCell align="center" colSpan={numColumns} className="h-[375px]">
      <Paper sx={{ textAlign: "center" }}>
        <Typography variant="h6" paragraph>
          No results found
        </Typography>

        <Typography variant="body2">
          We couldn't find any results matching your search criteria.
        </Typography>
      </Paper>
    </TableCell>
  </TableRow>
);

export { NotFound };
