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
import { Stock } from "@/services/stock/interfaces";
import { NUM_DECIMALS } from "@/shared/constants";
import { HeaderColumnTypes } from "../interfaces";

interface Props extends Stock {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns?: HeaderColumnTypes[];
  isSelected?: boolean;
}

const StockRow = ({
  columns = Object.values(HeaderColumnTypes),
  isSelected = false,
  transactionDate,
  quantity = 0,
  product,
  onClick,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const totalPrice = (product?.unitPrice ?? 0) * quantity;

  const totalCost = (product?.unitCost ?? 0) * quantity;

  const handleOpenMenu = ({ currentTarget }: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={isSelected}>
        <TableCell>
          <Checkbox disableRipple checked={isSelected} onChange={onClick} />
        </TableCell>
        {columns.includes(HeaderColumnTypes.transactionDate) && (
          <TableCell className="whitespace-nowrap">
            {dayjs(transactionDate)?.format(DATE_FORMAT)}
          </TableCell>
        )}

        {columns.includes(HeaderColumnTypes.productId) && (
          <TableCell className="whitespace-nowrap">{product?.id}</TableCell>
        )}

        {columns.includes(HeaderColumnTypes.productCode) && (
          <TableCell>{product?.code && <Chip label={product?.code} color="info" />}</TableCell>
        )}

        {columns.includes(HeaderColumnTypes.productName) && <TableCell>{product?.name}</TableCell>}

        {columns.includes(HeaderColumnTypes.unitCost) && (
          <TableCell className="font-bold text-right">
            <p>
              <span>$</span>
              {product?.unitCost.toFixed(NUM_DECIMALS)}
            </p>
          </TableCell>
        )}

        {columns.includes(HeaderColumnTypes.unitPrice) && (
          <TableCell className="font-bold text-right">
            <p>
              <span>$</span>
              {product?.unitPrice.toFixed(NUM_DECIMALS)}
            </p>
          </TableCell>
        )}

        {columns.includes(HeaderColumnTypes.quantity) && (
          <TableCell className="text-right">{quantity}</TableCell>
        )}

        {columns.includes(HeaderColumnTypes.totalCost) && (
          <TableCell className="font-bold text-right">
            <p>
              <span>$</span>
              {totalCost.toFixed(NUM_DECIMALS)}
            </p>
          </TableCell>
        )}

        {columns.includes(HeaderColumnTypes.totalPrice) && (
          <TableCell className="font-bold text-right">
            <p>
              <span>$</span>
              {totalPrice.toFixed(NUM_DECIMALS)}
            </p>
          </TableCell>
        )}

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

export { StockRow };
