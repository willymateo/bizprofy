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
import { User } from "@/services/users/interfaces";
import { Menu } from "./Menu";

interface Props extends User {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected?: boolean;
}

const UserRow = ({ onClick, isSelected = false, ...user }: Props) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
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

        <TableCell className="whitespace-nowrap">
          {user?.username && (
            <Chip
              icon={<Icon icon="solar:user-bold-duotone" className="pl-3" />}
              color={user?.deletedAt ? "default" : "info"}
              label={user?.username ?? ""}
            />
          )}
        </TableCell>
        <TableCell className="whitespace-nowrap">{user?.firstNames ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{user?.lastNames ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">
          <Link href={`mailto:${user?.email ?? ""}`} target="_blank">
            {user?.email ?? ""}
          </Link>
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {user?.deletedAt ? <Chip label="Inactive" /> : <Chip label="Active" color="success" />}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {dayjs(user?.createdAt).format(DATE_FORMAT)}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {dayjs(user?.updatedAt).format(DATE_FORMAT)}
        </TableCell>

        <TableCell className="sticky right-0 bg-white">
          <IconButton onClick={handleOpenMenu}>
            <Icon icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu anchorEl={anchorEl} onClose={handleCloseMenu} isOpen={isMenuOpen} user={user} />
    </>
  );
};

export { UserRow };
