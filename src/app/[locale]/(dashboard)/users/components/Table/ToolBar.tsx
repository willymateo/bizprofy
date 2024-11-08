import InputAdornment from "@mui/material/InputAdornment";
import MaterialToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";

import { GetUsersPayload } from "@/services/users/interfaces";
import { useTranslations } from "next-intl";

interface Props extends GetUsersPayload {
  numRowsSelected?: number;
}

const ToolBar = ({ numRowsSelected = 0 }: Props) => {
  const t = useTranslations();

  return (
    <MaterialToolbar
      className="flex flex-row flex-wrap items-center justify-center gap-3 py-7"
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
        <>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="eva:search-fill" />
                </InputAdornment>
              ),
            }}
            placeholder={`${t("Search")}...`}
            className="grow"
          />

          <Button variant="contained" endIcon={<Icon icon="icon-park-outline:search" />}>
            {t("Search")}
          </Button>

          <Tooltip title="Filter list">
            <IconButton>
              <Icon icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </MaterialToolbar>
  );
};

export { ToolBar };
