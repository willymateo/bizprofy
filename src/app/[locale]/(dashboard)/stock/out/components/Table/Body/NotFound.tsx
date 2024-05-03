import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";

import { HEADER_COLUMNS } from "../constants";

const NotFound = () => {
  const t = useTranslations();

  return (
    <TableRow>
      <TableCell align="center" colSpan={HEADER_COLUMNS.length + 2} className="h-[436px]">
        <div className="flex flex-col justify-center items-center gap-5">
          <Icon icon="solar:box-line-duotone" height={150} width={150} />

          <div className="flex flex-col justify-center items-center">
            <Typography variant="h6">{t("No results found")}</Typography>

            <Typography variant="body2">
              {t("We couldn't find any results matching your search criteria")}.
            </Typography>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export { NotFound };
