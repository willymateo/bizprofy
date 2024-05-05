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

import { DATE_FORMAT } from "@/app/[locale]/components/inputs/DateTimePickerHookForm/constants";
import { StockIn } from "@/services/stock/in/interfaces";
import { NUM_DECIMALS } from "@/shared/constants";

interface Props extends StockIn {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected?: boolean;
}

const StockInRow = ({
  isSelected = false,
  transactionDate,
  unitCost = 0,
  quantity = 0,
  product,
  onClick,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const totalCost = unitCost * quantity;

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
          {dayjs(transactionDate)?.format(DATE_FORMAT)}
        </TableCell>

        <TableCell className="whitespace-nowrap">
          {product?.code && <Chip label={product?.code} color="info" />}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          <Link href={`/products/${product?.id}`} className="no-underline text-slate-800">
            {product?.name}
          </Link>
        </TableCell>

        <TableCell className="whitespace-nowrap">
          <Link
            href={`/providers/${product?.provider?.id}`}
            className="no-underline text-slate-800"
          >
            {`${product?.provider?.firstNames ?? ""} ${product?.provider?.lastNames ?? ""}`.trim()}
          </Link>
        </TableCell>
        <TableCell className="whitespace-nowrap">
          <Link href={`mailto:${product?.provider?.email}`} target="_blank">
            {product?.provider?.email}
          </Link>
        </TableCell>

        <TableCell className="font-bold text-right">
          <p>
            <span>$</span>
            {unitCost?.toFixed(NUM_DECIMALS) ?? "0.00"}
          </p>
        </TableCell>
        <TableCell className="text-right whitespace-nowrap">{quantity}</TableCell>
        <TableCell className="font-bold text-right whitespace-nowrap">
          <p>
            <span>$</span>
            {totalCost?.toFixed(NUM_DECIMALS) ?? "0.00"}
          </p>
        </TableCell>

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

export { StockInRow };
