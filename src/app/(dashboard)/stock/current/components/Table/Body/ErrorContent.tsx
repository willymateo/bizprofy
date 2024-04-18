import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Icon } from "@iconify-icon/react";

import { HEADER_COLUMNS } from "../constants";

const ErrorContent = () => (
  <TableRow>
    <TableCell align="center" colSpan={HEADER_COLUMNS.length + 2} className="h-[497px]">
      <div className="flex flex-col justify-center items-center gap-5">
        <Icon icon="solar:cloud-cross-line-duotone" height={150} width={150} />

        <div className="flex flex-col justify-center items-center">
          <Typography variant="h6">This is unexpected for us</Typography>

          <Typography variant="body2">
            We couldn't load the data. Please try again later.
          </Typography>
        </div>
      </div>
    </TableCell>
  </TableRow>
);

export { ErrorContent };
