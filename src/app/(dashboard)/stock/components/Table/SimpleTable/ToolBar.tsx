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
    className="flex flex-row flex-wrap items-center gap-3 py-7"
    sx={{
      p: theme => theme.spacing(0, 1, 0, 3),
      ...(numRowsSelected > 0 && {
        bgcolor: "primary.lighter",
        color: "primary.main",
      }),
    }}
  >
    {numRowsSelected > 0 ? (
      <Typography component="div" variant="subtitle1" className="grow">
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
        className="grow"
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
