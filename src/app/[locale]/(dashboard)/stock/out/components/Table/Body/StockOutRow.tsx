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
import { StockOut } from "@/services/stock/out/interfaces";
import { NUM_DECIMALS } from "@/constants";

interface Props extends StockOut {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected?: boolean;
}

const StockOutRow = ({
  isSelected = false,
  transactionDate,
  unitPrice = 0,
  quantity = 0,
  customer,
  product,
  onClick,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const totalPrice = unitPrice * quantity;

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

        <TableCell className="whitespace-nowrap">
          <Link href={`/customers/${customer?.id}`} className="no-underline text-slate-800">
            {`${customer?.firstNames ?? ""} ${customer?.lastNames ?? ""}`.trim()}
          </Link>
        </TableCell>
        <TableCell className="whitespace-nowrap">
          <Link href={`mailto:${customer?.email}`} target="_blank">
            {customer?.email}
          </Link>
        </TableCell>

        <TableCell className="font-bold text-right">
          <p>
            <span>$</span>
            {unitPrice?.toFixed(NUM_DECIMALS) ?? "0.00"}
          </p>
        </TableCell>
        <TableCell className="text-right whitespace-nowrap">{quantity}</TableCell>
        <TableCell className="font-bold text-right whitespace-nowrap">
          <p>
            <span>$</span>
            {totalPrice?.toFixed(NUM_DECIMALS) ?? "0.00"}
          </p>
        </TableCell>

        {/*
        <TableCell className="sticky right-0 bg-white">
          <IconButton onClick={handleOpenMenu}>
            <Icon icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
        */}
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

export { StockOutRow };
