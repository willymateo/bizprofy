import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import { Icon } from "@iconify-icon/react";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import dayjs from "dayjs";

import { DATE_FORMAT } from "@/app/components/inputs/DateTimePickerHookForm/constants";
import { Customer } from "@/services/customers/interfaces";

interface Props extends Customer {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected?: boolean;
}

const CustomerRow = ({
  isSelected = false,
  phoneNumber = "",
  firstNames = "",
  lastNames = "",
  address = "",
  idCard = "",
  email = "",
  createdAt,
  updatedAt,
  deletedAt,
  onClick,
  id = "",
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

        <TableCell className="whitespace-nowrap">{idCard ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{firstNames ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{lastNames ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">
          <Link href={`mailto:${email ?? ""}`} target="_blank">
            {email ?? ""}
          </Link>
        </TableCell>
        <TableCell className="whitespace-nowrap">{phoneNumber ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{address ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">
          {deletedAt ? <Chip label="Inactive" /> : <Chip label="Active" color="success" />}
        </TableCell>
        <TableCell className="whitespace-nowrap">{dayjs(createdAt).format(DATE_FORMAT)}</TableCell>
        <TableCell className="whitespace-nowrap">{dayjs(updatedAt).format(DATE_FORMAT)}</TableCell>

        <TableCell className="sticky right-0 bg-white">
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
        <MenuItem>
          <Link
            className="flex flex-row gap-3 w-full items-center no-underline text-black"
            href={`/customers/${id ?? ""}`}
          >
            <Icon icon="solar:pen-bold-duotone" />
            Edit
          </Link>
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} className="flex flex-row gap-3 text-red-500">
          <Icon icon="solar:trash-bin-minimalistic-bold-duotone" />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export { CustomerRow };
