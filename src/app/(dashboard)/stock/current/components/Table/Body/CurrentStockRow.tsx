import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import { Icon } from "@iconify-icon/react";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";

import { NUM_DECIMALS } from "@/shared/constants";
import { CurrentStock } from "@/services/stock/current/interfaces";

interface Props extends CurrentStock {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected?: boolean;
}

const CurrentStockRow = ({
  purchasesNumber = 0,
  isSelected = false,
  salesNumber = 0,
  totalPrice = 0,
  totalCost = 0,
  product,
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

        <TableCell className="whitespace-nowrap">
          {product?.code && <Chip label={product?.code} color="info" />}
        </TableCell>

        <TableCell className="whitespace-nowrap">{product?.name}</TableCell>

        <TableCell className="text-right whitespace-nowrap">{purchasesNumber}</TableCell>

        <TableCell className="font-bold text-right whitespace-nowrap">
          <p>
            <span>$</span>
            {product?.unitCost.toFixed(NUM_DECIMALS)}
          </p>
        </TableCell>

        <TableCell className="font-bold text-right whitespace-nowrap">
          <p>
            <span>$</span>
            {totalCost.toFixed(NUM_DECIMALS)}
          </p>
        </TableCell>

        <TableCell className="text-right whitespace-nowrap">{salesNumber}</TableCell>

        <TableCell className="font-bold text-right whitespace-nowrap">
          <p>
            <span>$</span>
            {product?.unitPrice.toFixed(NUM_DECIMALS)}
          </p>
        </TableCell>

        <TableCell className="font-bold text-right whitespace-nowrap">
          <p>
            <span>$</span>
            {totalPrice.toFixed(NUM_DECIMALS)}
          </p>
        </TableCell>

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

export { CurrentStockRow };
