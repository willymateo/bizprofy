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
import { Provider } from "@/services/providers/interfaces";
import { Menu } from "./Menu";

type Props = Provider & {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected?: boolean;
};

const ProviderRow = ({ isSelected = false, onClick, ...provider }: Props) => {
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

        <TableCell className="whitespace-nowrap">{provider?.firstNames ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{provider?.lastNames ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{provider?.companyName ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{provider?.idCard ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">
          <Link href={`mailto:${provider?.email ?? ""}`} target="_blank">
            {provider?.email ?? ""}
          </Link>
        </TableCell>
        <TableCell className="whitespace-nowrap">{provider?.phoneNumber ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">{provider?.address ?? ""}</TableCell>
        <TableCell className="whitespace-nowrap">
          {provider?.deletedAt ? (
            <Chip label="Inactive" />
          ) : (
            <Chip label="Active" color="success" />
          )}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {dayjs(provider?.createdAt).format(DATE_FORMAT)}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {dayjs(provider?.updatedAt).format(DATE_FORMAT)}
        </TableCell>

        <TableCell className="sticky right-0 bg-white">
          <IconButton onClick={handleOpenMenu}>
            <Icon icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu anchorEl={anchorEl} onClose={handleCloseMenu} isOpen={isMenuOpen} provider={provider} />
    </>
  );
};

export { ProviderRow };
