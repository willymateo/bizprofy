import IconButton from "@mui/material/IconButton";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import { Icon } from "@iconify-icon/react";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import dayjs from "dayjs";

import { DATE_FORMAT } from "@/app/components/inputs/DateTimePickerHookForm/constants";
import { Warehouse } from "@/services/warehouses/interfaces";

interface Props extends Warehouse {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected?: boolean;
}

const WarehouseRow = ({
  isSelected = false,
  name = "",
  code = "",
  createdAt,
  updatedAt,
  deletedAt,
  id = "",
  onClick,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = ({ currentTarget }: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={isSelected}>
        <TableCell>
          <Checkbox disableRipple checked={isSelected} onChange={onClick} />
        </TableCell>

        <TableCell className="whitespace-nowrap">{id ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">
          {code && <Chip label={code ?? ""} color="info" />}
        </TableCell>
        <TableCell className="whitespace-nowrap">{name ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">
          {deletedAt ? <Chip label="Inactive" /> : <Chip label="Active" color="success" />}
        </TableCell>
        <TableCell className="whitespace-nowrap">{dayjs(createdAt).format(DATE_FORMAT)}</TableCell>
        <TableCell className="whitespace-nowrap">{dayjs(updatedAt).format(DATE_FORMAT)}</TableCell>

        <TableCell>
          <IconButton onClick={handleOpenMenu}>
            <Icon icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
        open={isMenuOpen}
      >
        <MenuItem onClick={handleCloseMenu} className="flex flex-row gap-3">
          <Icon icon="solar:pen-bold-duotone" />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} className="flex flex-row gap-3 text-red-500">
          <Icon icon="solar:trash-bin-minimalistic-bold-duotone" />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export { WarehouseRow };
