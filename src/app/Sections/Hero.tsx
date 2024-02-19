import { Button } from "@mui/material";
import Link from "next/link";

const Hero = () => (
  <div className="flex flex-col">
    <Link href="/login">
      <Button variant="contained">Login</Button>
    </Link>
  </div>
);

export { Hero };