import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { MouseEvent, useState } from "react";
import { Icon } from "@iconify-icon/react";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import dayjs from "dayjs";

import { DATE_FORMAT } from "@/app/components/inputs/DateTimePickerHookForm/constants";
import { Customer } from "@/services/customers/interfaces";
import { Menu } from "./Menu";

interface Props extends Customer {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected?: boolean;
}

const CustomerRow = ({ isSelected = false, onClick, ...customer }: Props) => {
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

        <TableCell className="whitespace-nowrap">{customer?.idCard ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{customer?.firstNames ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{customer?.lastNames ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">
          <Link href={`mailto:${customer?.email ?? ""}`} target="_blank">
            {customer?.email ?? ""}
          </Link>
        </TableCell>
        <TableCell className="whitespace-nowrap">{customer?.phoneNumber ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{customer?.address ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">
          {customer?.deletedAt ? (
            <Chip label="Inactive" />
          ) : (
            <Chip label="Active" color="success" />
          )}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {dayjs(customer?.createdAt).format(DATE_FORMAT)}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {dayjs(customer?.updatedAt).format(DATE_FORMAT)}
        </TableCell>

        <TableCell className="sticky right-0 bg-white">
          <IconButton onClick={handleOpenMenu}>
            <Icon icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu anchorEl={anchorEl} onClose={handleCloseMenu} isOpen={isMenuOpen} customer={customer} />
    </>
  );
};

export { CustomerRow };
