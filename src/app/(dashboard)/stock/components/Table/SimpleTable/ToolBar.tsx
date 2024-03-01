import InputAdornment from "@mui/material/InputAdornment";
import MaterialToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify-icon/react";
import { ChangeEvent } from "react";

interface Props {
  onChangeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  numRowsSelected?: number;
  query?: string;
}

const ToolBar = ({ numRowsSelected = 0, query = "", onChangeQuery }: Props) => (
  <MaterialToolbar
    sx={{
      height: 96,
      display: "flex",
      justifyContent: "space-between",
      p: theme => theme.spacing(0, 1, 0, 3),
      ...(numRowsSelected > 0 && {
        color: "primary.main",
        bgcolor: "primary.lighter",
      }),
    }}
  >
    {numRowsSelected > 0 ? (
      <Typography component="div" variant="subtitle1">
        {numRowsSelected} selected
      </Typography>
    ) : (
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="eva:search-fill" />
            </InputAdornment>
          ),
        }}
        onChange={onChangeQuery}
        placeholder="Search..."
        value={query}
      />
    )}

    {numRowsSelected > 0 ? (
      <Tooltip title="Delete">
        <IconButton>
          <Icon icon="eva:trash-2-fill" />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Filter list">
        <IconButton>
          <Icon icon="ic:round-filter-list" />
        </IconButton>
      </Tooltip>
    )}
  </MaterialToolbar>
);

export { ToolBar };
