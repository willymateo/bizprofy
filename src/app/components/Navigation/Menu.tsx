import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Menu = () => (
  <div className="flex flex-col gap-3">
    <ListItemButton className="grow-0">
      <Link href="/" className="flex flex-row items-center justify-start gap-3">
        <FontAwesomeIcon icon={faChartLine} />

        <Typography>Dashboard</Typography>
      </Link>
    </ListItemButton>

    <ListItemButton className="grow-0">
      <Link href="/" className="flex flex-row items-center justify-start gap-3">
        <FontAwesomeIcon icon={faChartLine} />

        <Typography>Openning Stock</Typography>
      </Link>
    </ListItemButton>

    <ListItemButton className="grow-0">
      <Link href="/" className="flex flex-row items-center justify-start gap-3">
        <FontAwesomeIcon icon={faChartLine} />

        <Typography>Stock In</Typography>
      </Link>
    </ListItemButton>

    <ListItemButton className="grow-0">
      <Link href="/" className="flex flex-row items-center justify-start gap-3">
        <FontAwesomeIcon icon={faChartLine} />

        <Typography>Stock Out</Typography>
      </Link>
    </ListItemButton>

    <ListItemButton className="grow-0">
      <Link href="/" className="flex flex-row items-center justify-start gap-3">
        <FontAwesomeIcon icon={faChartLine} />

        <Typography>Current stock</Typography>
      </Link>
    </ListItemButton>
  </div>
);

export { Menu };
